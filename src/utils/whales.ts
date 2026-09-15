import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';
import whalesData from '../data/whales.json';

export type WhaleType = 'order' | 'suborder' | 'family' | 'genus' | 'species';

export interface WhaleNode {
  id: string;
  label: string;
  type: string;
  parent?: string;
  children?: string[];
  description?: string;
  common_name?: string;
  iucn_status?: string;
  size?: string;
  weight?: string;
  species_count?: number;
}

export const nodes = whalesData.nodes as WhaleNode[];

/** id -> node. Built once per build; every lookup below goes through it. */
export const byId: Record<string, WhaleNode> = Object.fromEntries(
  nodes.map((n) => [n.id, n])
);

/**
 * IUCN Red List palette from the Atlas design. Both themes use it — status
 * colour is data, not decoration, so it must not shift when the theme does.
 */
export const IUCN_COLORS: Record<string, string> = {
  'Least Concern': '#4FA86B',
  'Near Threatened': '#C9A227',
  Vulnerable: '#D98324',
  Endangered: '#C85A3B',
  'Critically Endangered': '#A8324A',
  'Data Deficient': '#7E8C99',
};

/** Most threatened first — the order the legend and the filter chips use. */
export const IUCN_ORDER = [
  'Critically Endangered',
  'Endangered',
  'Vulnerable',
  'Near Threatened',
  'Least Concern',
  'Data Deficient',
];

export function iucnColor(status?: string): string {
  return (status && IUCN_COLORS[status]) || IUCN_COLORS['Data Deficient'];
}

/** Children that actually resolve to a node. whales.json carries at least one
 *  dangling id (`m_perrin`), and an unfiltered lookup would render a blank. */
export function childrenOf(id: string): WhaleNode[] {
  const n = byId[id];
  if (!n?.children) return [];
  return n.children.map((c) => byId[c]).filter(Boolean);
}

/** Ancestors from the order down to (and including) the node itself. */
export function lineageOf(id: string): WhaleNode[] {
  const chain: WhaleNode[] = [];
  let cur: WhaleNode | undefined = byId[id];
  while (cur) {
    chain.unshift(cur);
    cur = cur.parent ? byId[cur.parent] : undefined;
  }
  return chain;
}

/** Every species at or below a node, in taxonomic order. */
export function speciesUnder(id: string): WhaleNode[] {
  const out: WhaleNode[] = [];
  const walk = (nodeId: string) => {
    for (const child of childrenOf(nodeId)) {
      if (child.type === 'species') out.push(child);
      else walk(child.id);
    }
  };
  walk(id);
  return out;
}

/** "Balaenopteridae (Rorquals)" -> "Balaenopteridae" */
export function shortLabel(label: string): string {
  const m = label.match(/^(.*?)\s*\(/);
  return m ? m[1].trim() : label;
}

/** "Balaenopteridae (Rorquals)" -> "Rorquals" */
export function commonLabel(label: string): string {
  const m = label.match(/^.*?\s*\((.*)\)\s*$/);
  return m ? m[1].trim() : '';
}

/**
 * The bare scientific name of a taxon above species level.
 *
 * Strips both the parenthetical vernacular ("Balaenopteridae (Rorquals)") and
 * a rank word the dataset put in the label itself ("Order Cetacea") — the page
 * states the rank separately, so repeating it reads as a stutter.
 */
export function sciName(node: WhaleNode): string {
  return shortLabel(node.label).replace(
    /^(Order|Suborder|Family|Genus)\s+/i,
    ''
  );
}

/**
 * Full binomial for a species: "B. musculus" -> "Balaenoptera musculus".
 *
 * whales.json stores species labels abbreviated the way a field guide prints
 * them once the genus is established by context. On a page that is reached
 * directly from a search result there is no such context, and the abbreviated
 * form is not something anyone searches for, so the genus is expanded from the
 * parent node. Falls back to the stored label if the parent is missing.
 */
export function binomialOf(species: WhaleNode): string {
  const genus = species.parent ? byId[species.parent] : undefined;
  if (!genus) return species.label;
  const epithet = species.label.replace(/^[A-Z]\.\s*/, '');
  // Nothing was abbreviated — the label already carries a full genus name.
  if (epithet === species.label) return species.label;
  return `${shortLabel(genus.label)} ${epithet}`;
}

const imageModules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/*.{jpeg,jpg,png,gif,webp}',
  { eager: true }
);

/** Source image for a species, or null when we have no photo for it. */
export function imageFor(speciesId: string): ImageMetadata | null {
  for (const ext of ['webp', 'jpg', 'jpeg', 'png', 'gif']) {
    const mod = imageModules[`/src/assets/${speciesId}.${ext}`];
    if (mod) return mod.default;
  }
  return null;
}

export interface SpeciesEntry {
  id: string;
  common: string;
  /** Abbreviated, as the cards print it: "B. musculus". */
  sci: string;
  /** Expanded: "Balaenoptera musculus". Searchable even where not displayed. */
  binomial: string;
  iucn: string;
  iucnColor: string;
  genus: string;
  family: string;
  suborder: string;
  suborderId: string;
  size: string;
  weight: string;
  desc: string;
}

/** Flattened species list with its lineage denormalised, for grids and search. */
export const allSpecies: SpeciesEntry[] = nodes
  .filter((n) => n.type === 'species')
  .map((n) => {
    const genus = n.parent ? byId[n.parent] : undefined;
    const family = genus?.parent ? byId[genus.parent] : undefined;
    const suborder = family?.parent ? byId[family.parent] : undefined;
    return {
      id: n.id,
      common: n.common_name || n.label,
      sci: n.label,
      binomial: binomialOf(n),
      iucn: n.iucn_status || 'Data Deficient',
      iucnColor: iucnColor(n.iucn_status),
      genus: genus?.label ?? '',
      family: family ? shortLabel(family.label) : '',
      suborder: suborder ? shortLabel(suborder.label) : '',
      suborderId: suborder?.id ?? '',
      size: n.size || '—',
      weight: n.weight || '—',
      desc: n.description || '',
    };
  });

export const counts = {
  species: allSpecies.length,
  genera: nodes.filter((n) => n.type === 'genus').length,
  families: nodes.filter((n) => n.type === 'family').length,
  suborders: nodes.filter((n) => n.type === 'suborder').length,
};

/** Species count per IUCN status, most threatened first. */
export const iucnBreakdown = IUCN_ORDER.map((status) => ({
  status,
  color: IUCN_COLORS[status],
  count: allSpecies.filter((s) => s.iucn === status).length,
})).filter((s) => s.count > 0);

/**
 * The graph and its panels are built in the browser, so they need plain URLs
 * rather than ImageMetadata. Run every species photo through Astro's optimiser
 * at build time and hand the client a small id -> url map.
 */
export async function speciesThumbnails(
  width = 560
): Promise<Record<string, string>> {
  const entries = await Promise.all(
    allSpecies.map(async (s) => {
      const src = imageFor(s.id);
      if (!src) return null;
      const img = await getImage({ src, width, format: 'webp' });
      return [s.id, img.src] as const;
    })
  );
  return Object.fromEntries(
    entries.filter(Boolean) as (readonly [string, string])[]
  );
}

/**
 * Taxonomy payload the client-side radial graph walks. Mirrors the shape the
 * Atlas design's whaleData.js used, minus the fields only the panels need.
 */
export function graphData(thumbs: Record<string, string>) {
  return nodes
    .filter((n) => byId[n.id])
    .map((n) => ({
      id: n.id,
      label: n.label,
      type: n.type,
      parent: n.parent,
      children: (n.children || []).filter((c) => byId[c]),
      // Derived, not read from species_count: the dataset's mesoplodon entry
      // declares 17 because its children list carries a dangling `m_perrin`
      // id. Counting the tree keeps the badge, the panel and /genus/mesoplodon
      // telling the same story.
      count: n.type === 'species' ? undefined : speciesUnder(n.id).length,
      common: n.common_name,
      iucn: n.iucn_status,
      desc: n.description,
      size: n.size,
      weight: n.weight,
      img: thumbs[n.id],
    }));
}
