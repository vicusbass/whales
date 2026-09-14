/**
 * Canonical URLs, meta-description shaping and JSON-LD builders.
 *
 * Everything here exists so that the three places a URL is written — the
 * <link rel="canonical">, the internal <a href>, and the sitemap — cannot
 * drift apart. `site` in astro.config.mjs is the single source of truth for
 * the host; this module is the single source of truth for its spelling.
 */

import { getImage } from 'astro:assets';
import { byId, binomialOf, commonLabel, imageFor, sciName } from './whales';
import type { WhaleNode } from './whales';

/** Must match `site` in astro.config.mjs. */
export const SITE = 'https://whales.rocks';

export const SITE_NAME = 'Whale Encyclopedia';

/**
 * One spelling of a path: no trailing slash, except for the root.
 *
 * Astro hands us `/species/b_musculus/` in a directory-format build even when
 * `trailingSlash: 'never'` governs the links we emit, so normalising here is
 * what keeps the canonical pointing at the URL our own links use.
 */
export function canonicalPath(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

/** Absolute canonical URL for a pathname. */
export function canonicalUrl(pathname: string): string {
  return new URL(canonicalPath(pathname), SITE).href;
}

/** Absolute URL for a build-time asset path such as `/_astro/x.jpg`. */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE).href;
}

/**
 * Trim to a whole word within `max` characters, adding an ellipsis only when
 * something was actually dropped. Google renders roughly 155-160 characters of
 * a description, and a sentence cut mid-word ("...pleated thr") wastes the
 * part a reader actually sees.
 */
export function truncateAtWord(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  // -1 leaves room for the ellipsis itself.
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 40 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.\s]+$/, '')}…`;
}

/**
 * Meta description for a species page.
 *
 * Leads with the binomial and the IUCN status because those are the two facts
 * a searcher is most often checking, then spends the remaining budget on the
 * species' own prose rather than on a "Learn about …" preamble.
 */
export function speciesDescription(species: WhaleNode): string {
  const binomial = binomialOf(species);
  const status = species.iucn_status || 'Not Evaluated';
  const lead = `${binomial} · ${status}.`;
  const body = species.description?.trim();
  if (!body) {
    const size = species.size ? ` Grows to ${species.size}.` : '';
    return `${lead}${size} Taxonomy, size and conservation status of the ${
      species.common_name || binomial
    }.`;
  }
  return `${lead} ${truncateAtWord(body, 155 - lead.length - 1)}`;
}

/** Meta description for an order/suborder/family/genus page. */
export function taxonDescription(
  taxon: WhaleNode,
  speciesCount: number,
  summary?: string
): string {
  const name = sciName(taxon);
  const rank = taxon.type;
  const lead = `${name} — ${speciesCount} living whale species.`;
  if (summary)
    return `${lead} ${truncateAtWord(summary, 155 - lead.length - 1)}`;
  const common = taxon.common_name || commonLabel(taxon.label);
  return truncateAtWord(
    `${lead}${common ? ` The ${rank} of ${common.toLowerCase()}.` : ''} Taxonomy, photographs and IUCN conservation status for every one.`
  );
}

/* --------------------------------------------------------------------------
   JSON-LD
   --------------------------------------------------------------------------
   Every @id is a real, canonical URL plus a fragment, so nodes emitted on
   different pages resolve to the same entity when a consumer merges them.
   -------------------------------------------------------------------------- */

export type JsonLdNode = Record<string, unknown>;

/* --------------------------------------------------------------------------
   Sharing cards
   -------------------------------------------------------------------------- */

/** og:image is 1.91:1 by convention; a square is letterboxed or centre-cropped. */
export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

export interface SocialImage {
  url: string;
  width: number;
  height: number;
  alt: string;
}

/**
 * Build a sharing card from a species photo.
 *
 * JPEG rather than WebP: the photo is already in the build as WebP for the
 * page itself, but several link-preview scrapers still do not render WebP,
 * and a card that fails to render is worth less than the extra bytes.
 */
export async function socialImageForSpecies(
  species: WhaleNode,
  alt?: string
): Promise<SocialImage | undefined> {
  const src = imageFor(species.id);
  if (!src) return undefined;
  const rendered = await getImage({
    src,
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fit: 'cover',
    format: 'jpeg',
    quality: 78,
  });
  return {
    url: absoluteUrl(rendered.src),
    width: OG_WIDTH,
    height: OG_HEIGHT,
    alt:
      alt ??
      `${species.common_name || binomialOf(species)} (${binomialOf(species)})`,
  };
}

/** A taxon has no photo of its own — borrow the first one beneath it. */
export async function socialImageForTaxon(
  taxon: WhaleNode,
  species: WhaleNode[]
): Promise<SocialImage | undefined> {
  const withPhoto = species.find((s) => imageFor(s.id));
  if (!withPhoto) return undefined;
  return socialImageForSpecies(
    withPhoto,
    `${sciName(taxon)} — ${withPhoto.common_name || binomialOf(withPhoto)}`
  );
}

/** Stable @id for a taxon, wherever it is referenced from. */
export function taxonId(node: WhaleNode): string {
  return `${canonicalUrl(`/${node.type}/${node.id}`)}#taxon`;
}

/** schema.org rank vocabulary uses the plain English rank name. */
function rankOf(node: WhaleNode): string {
  return node.type;
}

/** The name a taxon should be known by: scientific, with the vernacular aside. */
function taxonName(node: WhaleNode): string {
  return node.type === 'species'
    ? node.common_name || binomialOf(node)
    : sciName(node);
}

/** A `parentTaxon`/`childTaxon` stub — enough to resolve, not a full node. */
function taxonRef(node: WhaleNode): JsonLdNode {
  return {
    '@type': 'Taxon',
    '@id': taxonId(node),
    name: taxonName(node),
    scientificName: node.type === 'species' ? binomialOf(node) : sciName(node),
    taxonRank: rankOf(node),
    url: canonicalUrl(`/${node.type}/${node.id}`),
  };
}

export function breadcrumbList(trail: WhaleNode[]): JsonLdNode {
  const items = [
    { name: 'Home', url: canonicalUrl('/') },
    ...trail.map((node) => ({
      name: taxonName(node),
      url: canonicalUrl(`/${node.type}/${node.id}`),
    })),
  ];
  return {
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl(
      `/${trail[trail.length - 1].type}/${trail[trail.length - 1].id}`
    )}#breadcrumbs`,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export interface TaxonImage {
  url: string;
  width: number;
  height: number;
  caption: string;
  creator?: string;
}

export function imageObject(image: TaxonImage, pageUrl: string): JsonLdNode {
  return {
    '@type': 'ImageObject',
    '@id': `${pageUrl}#primaryimage`,
    contentUrl: image.url,
    url: image.url,
    width: image.width,
    height: image.height,
    caption: image.caption,
    ...(image.creator
      ? {
          creator: { '@type': 'Person', name: image.creator },
          // Every photo in src/assets came from Wikimedia Commons; the exact
          // per-file licence lives with the file there, which is what
          // acquireLicensePage points at.
          acquireLicensePage: 'https://commons.wikimedia.org/',
        }
      : {}),
  };
}

/** Facts worth exposing as machine-readable properties rather than prose. */
function measurements(species: WhaleNode): JsonLdNode[] {
  const props: JsonLdNode[] = [];
  if (species.iucn_status) {
    props.push({
      '@type': 'PropertyValue',
      name: 'IUCN Red List status',
      value: species.iucn_status,
      url: 'https://www.iucnredlist.org/',
    });
  }
  if (species.size) {
    props.push({
      '@type': 'PropertyValue',
      name: 'Length',
      value: species.size,
    });
  }
  if (species.weight) {
    props.push({
      '@type': 'PropertyValue',
      name: 'Weight',
      value: species.weight,
    });
  }
  return props;
}

export function speciesTaxon(species: WhaleNode, hasImage = false): JsonLdNode {
  const url = canonicalUrl(`/species/${species.id}`);
  const genus = species.parent ? byId[species.parent] : undefined;
  const binomial = binomialOf(species);
  const alternates = [binomial, species.label].filter(
    (n) => n && n !== (species.common_name || binomial)
  );

  return {
    '@type': 'Taxon',
    '@id': taxonId(species),
    url,
    name: species.common_name || binomial,
    alternateName: Array.from(new Set(alternates)),
    scientificName: binomial,
    taxonRank: 'species',
    ...(genus ? { parentTaxon: taxonRef(genus) } : {}),
    ...(species.description ? { description: species.description } : {}),
    ...(hasImage ? { image: { '@id': `${url}#primaryimage` } } : {}),
    ...(measurements(species).length
      ? { additionalProperty: measurements(species) }
      : {}),
  };
}

export function higherTaxon(
  taxon: WhaleNode,
  children: WhaleNode[],
  description?: string
): JsonLdNode {
  const url = canonicalUrl(`/${taxon.type}/${taxon.id}`);
  const parent = taxon.parent ? byId[taxon.parent] : undefined;
  const common = taxon.common_name || commonLabel(taxon.label);

  return {
    '@type': 'Taxon',
    '@id': taxonId(taxon),
    url,
    name: sciName(taxon),
    ...(common ? { alternateName: common } : {}),
    scientificName: sciName(taxon),
    taxonRank: rankOf(taxon),
    ...(parent ? { parentTaxon: taxonRef(parent) } : {}),
    ...(description ? { description } : {}),
    ...(children.length ? { childTaxon: children.map(taxonRef) } : {}),
  };
}

/** `CollectionPage` + `ItemList` for a page whose job is to list taxa. */
export function taxonItemList(
  pageUrl: string,
  name: string,
  items: WhaleNode[]
): JsonLdNode {
  return {
    '@type': 'ItemList',
    '@id': `${pageUrl}#itemlist`,
    name,
    numberOfItems: items.length,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: items.map((node, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: taxonRef(node),
    })),
  };
}

export function webSite(): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': `${SITE}/#website`,
    url: `${SITE}/`,
    name: SITE_NAME,
    alternateName: 'Cetacea Atlas',
    description:
      'An atlas of every living whale species, mapped across the branches of life.',
    inLanguage: 'en',
    publisher: { '@id': `${SITE}/#publisher` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE}/species?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function publisher(): JsonLdNode {
  return {
    '@type': 'Organization',
    '@id': `${SITE}/#publisher`,
    name: SITE_NAME,
    url: `${SITE}/`,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE}/og-default.png`,
      width: 1200,
      height: 630,
    },
    founder: [
      { '@type': 'Person', name: 'Vic Pop' },
      { '@type': 'Person', name: 'Andrei Pop' },
    ],
  };
}

/** The `WebPage` every page-level graph hangs off. */
export function webPage(options: {
  url: string;
  name: string;
  description: string;
  primaryEntityId?: string;
  breadcrumbId?: string;
  imageId?: string;
}): JsonLdNode {
  return {
    '@type': 'WebPage',
    '@id': `${options.url}#webpage`,
    url: options.url,
    name: options.name,
    description: options.description,
    inLanguage: 'en',
    isPartOf: { '@id': `${SITE}/#website` },
    ...(options.primaryEntityId
      ? { mainEntity: { '@id': options.primaryEntityId } }
      : {}),
    ...(options.breadcrumbId
      ? { breadcrumb: { '@id': options.breadcrumbId } }
      : {}),
    ...(options.imageId
      ? { primaryImageOfPage: { '@id': options.imageId } }
      : {}),
  };
}

/** Wrap page nodes into the single `@graph` document a page emits. */
export function graph(nodes: JsonLdNode[]): JsonLdNode {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
