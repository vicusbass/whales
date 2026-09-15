/**
 * Provenance and licence for every species photograph.
 *
 * Google's Image Metadata structured-data feature wants `creator`,
 * `creditText`, `copyrightNotice`, `license` and `acquireLicensePage` on the
 * `ImageObject` a page emits; Search Console flags the ones we leave out. The
 * values below are not parsed out of prose at build time — they were read from
 * each file's `extmetadata` on Wikimedia Commons, after the local file was
 * matched to its Commons original by SHA-1, so the licence we publish is the
 * licence the file actually carries.
 *
 * Species absent from this map have no verified provenance. They get no
 * `ImageObject` at all rather than an unlicensed or invented one: a wrong
 * attribution is worse than a missing feature.
 */

/** Everything needed to credit and licence one species photograph. */
export interface ImageCredit {
  /** Commons file name, for tracing an entry back to its source. */
  file: string;
  /** Commons file page — where the full licence terms live. */
  source: string;
  /** Photographer or illustrator. Absent on files Commons records none for. */
  creator?: string;
  /** Set where the credited party is a body, not a photographer. */
  creatorType?: 'Organization';
  /** Human-readable licence, as Commons names it: "CC BY-SA 4.0". */
  licenseName: string;
  /**
   * Deed URL. Public-domain files get the CC Public Domain Mark, which is the
   * canonical URL for "no known copyright" — Commons' own PD templates
   * (PD-USGov, PD-old) have no deed of their own to point at.
   */
  licenseUrl: string;
}

export const imageCredits: Record<string, ImageCredit> = {
  b_bairdii: {
    file: 'Berardius bairdii.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:Berardius_bairdii.jpg',
    creator: 'NOAA United States. National Marine Fisheries Service',
    creatorType: 'Organization',
    licenseName: 'Public domain',
    licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
  },
  b_borealis: {
    file: 'Balaenoptera borealis.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:Balaenoptera_borealis.jpg',
    creator: 'NOAA United States. National Marine Fisheries Service',
    creatorType: 'Organization',
    licenseName: 'Public domain',
    licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
  },
  b_edeni: {
    file: 'Bryde´s whale.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:Bryde%C2%B4s_whale.jpg',
    creator: 'Morningdew',
    licenseName: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
  },
  b_minimus: {
    file: 'Berardius minimus illustration.png',
    source:
      'https://commons.wikimedia.org/wiki/File:Berardius_minimus_illustration.png',
    creator: 'Yoshimi Watanabe',
    licenseName: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0',
  },
  b_mysticetus: {
    file: 'Bowhead Whale NOAA.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:Bowhead_Whale_NOAA.jpg',
    creator: 'Vicki Beaver, Alaska Fisheries Science Center, NOAA Fisheries',
    licenseName: 'Public domain',
    licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
  },
  b_omurai: {
    file: 'Balaenoptera omurai, Madagascar - Royal Society Open Science 1.jpg',
    source:
      'https://commons.wikimedia.org/wiki/File:Balaenoptera_omurai%2C_Madagascar_-_Royal_Society_Open_Science_1.jpg',
    creator: 'Salvatore Cerchio et al. / Royal Society Open Science',
    creatorType: 'Organization',
    licenseName: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0',
  },
  b_physalus: {
    file: 'Finhval (1).jpg',
    source: 'https://commons.wikimedia.org/wiki/File:Finhval_(1).jpg',
    creator: 'Aqqa Rosing-Asvid / Visit Greenland',
    licenseName: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0',
  },
  b_ricei: {
    file: "Rice's whale close to surface.jpg",
    source:
      "https://commons.wikimedia.org/wiki/File:Rice's_whale_close_to_surface.jpg",
    creator: 'National Oceanic and Atmospheric Association (NOAA)',
    creatorType: 'Organization',
    licenseName: 'Public domain',
    licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
  },
  e_glacialis: {
    file: 'GRNMS - Right Whales (31361234602).jpg',
    source:
      'https://commons.wikimedia.org/wiki/File:GRNMS_-_Right_Whales_(31361234602).jpg',
    creator: 'National Marine Sanctuaries',
    creatorType: 'Organization',
    licenseName: 'Public domain',
    licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
  },
  e_robustus: {
    file: 'Eschrichtius robustus 01-cropped.jpg',
    source:
      'https://commons.wikimedia.org/wiki/File:Eschrichtius_robustus_01-cropped.jpg',
    creator: 'Merrill Gosho, NOAA',
    licenseName: 'Public domain',
    licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
  },
  h_ampullatus: {
    file: 'Hyperoodon ampullatus jumping.jpg',
    source:
      'https://commons.wikimedia.org/wiki/File:Hyperoodon_ampullatus_jumping.jpg',
    creator: 'Saana Isojunno',
    licenseName: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
  },
  i_pacificus: {
    file: 'Indopacetus pacificus 2.jpg',
    source:
      'https://commons.wikimedia.org/wiki/File:Indopacetus_pacificus_2.jpg',
    creator: 'Jörg Mazur',
    licenseName: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
  },
  m_bidens: {
    file: 'Mesoplodon bidens British mammals (Pl. 46) (21866206616).jpg',
    source:
      'https://commons.wikimedia.org/wiki/File:Mesoplodon_bidens_British_mammals_(Pl._46)_(21866206616).jpg',
    creator: 'Archibald Thorburn',
    licenseName: 'Public domain',
    licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
  },
  m_bowdoini: {
    file: 'Mesoplodon bowdoini.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:Mesoplodon_bowdoini.jpg',
    creator: 'Jörg Mazur',
    licenseName: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
  },
  m_carlhubbsi: {
    file: 'Mesoplodon carlhubbsi.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:Mesoplodon_carlhubbsi.jpg',
    creator: 'Jörg Mazur',
    licenseName: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
  },
  m_densirostris: {
    file: 'Mesoplodon densirostris.jpg',
    source:
      'https://commons.wikimedia.org/wiki/File:Mesoplodon_densirostris.jpg',
    creator: 'Jörg Mazur',
    licenseName: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
  },
  m_eueu: {
    file: 'Mesoplodon eueu.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:Mesoplodon_eueu.jpg',
    creator: 'Vivian Ward',
    licenseName: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
  },
  m_europaeus: {
    file: 'Mesoplodon europaeus 2.jpg',
    source:
      'https://commons.wikimedia.org/wiki/File:Mesoplodon_europaeus_2.jpg',
    creator: 'Jörg Mazur',
    licenseName: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
  },
  m_ginkgodens: {
    file: 'Mesoplodon ginkgodens 2.jpg',
    source:
      'https://commons.wikimedia.org/wiki/File:Mesoplodon_ginkgodens_2.jpg',
    creator: 'Jörg Mazur',
    licenseName: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
  },
  m_grayi: {
    file: 'Mesoplodon grayi 2.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:Mesoplodon_grayi_2.jpg',
    creator: 'Jörg Mazur',
    licenseName: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
  },
  m_hectori: {
    file: 'Mesoplodon hectori.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:Mesoplodon_hectori.jpg',
    creator: 'Jörg Mazur',
    licenseName: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
  },
  m_layardii: {
    file: 'Mesoplodon layardii.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:Mesoplodon_layardii.jpg',
    creator: 'Jörg Mazur',
    licenseName: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
  },
  m_mirus: {
    file: "The True's beaked whale photographed underwater.jpg",
    source:
      "https://commons.wikimedia.org/wiki/File:The_True's_beaked_whale_photographed_underwater.jpg",
    creator: 'Roland Edler',
    licenseName: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0',
  },
  m_novaeangliae: {
    file: 'Humpback Whale underwater shot.jpg',
    source:
      'https://commons.wikimedia.org/wiki/File:Humpback_Whale_underwater_shot.jpg',
    // Commons records no Artist, but the file is tagged {{PD-USGov-NOAA}} and
    // sourced from the NOAA Photo Library Flickr stream.
    creator: 'NOAA Photo Library',
    creatorType: 'Organization',
    licenseName: 'Public domain',
    licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
  },
  m_perrini: {
    file: 'Mesoplodon perrini.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:Mesoplodon_perrini.jpg',
    creator: 'Jörg Mazur',
    licenseName: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
  },
  m_peruvianus: {
    file: 'Mesoplodon peruvianus.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:Mesoplodon_peruvianus.jpg',
    creator: 'Jörg Mazur',
    licenseName: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
  },
  m_stejnegeri: {
    file: 'Mesoplodon stejnegeri.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:Mesoplodon_stejnegeri.jpg',
    creator: 'Jörg Mazur',
    licenseName: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
  },
  m_traversii: {
    file: 'Mesoplodon traversii.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Mesoplodon_traversii.svg',
    creator: 'Yassine Mrabet',
    licenseName: 'CC BY 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/3.0',
  },
  p_macrocephalus: {
    file: 'Mother and baby sperm whale.jpg',
    source:
      'https://commons.wikimedia.org/wiki/File:Mother_and_baby_sperm_whale.jpg',
    creator: 'Gabriel Barathieu',
    licenseName: 'CC BY-SA 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
  },
  t_shepherdi: {
    file: 'Tasmacetus shepherdi.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:Tasmacetus_shepherdi.jpg',
    creator: 'Jörg Mazur',
    licenseName: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
  },
  z_cavirostris: {
    file: 'Ziphius cavirostris 67103312.jpg',
    source:
      'https://commons.wikimedia.org/wiki/File:Ziphius_cavirostris_67103312.jpg',
    creator: 'Charlotte Kirchner',
    licenseName: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0',
  },
};

export function creditFor(speciesId: string): ImageCredit | undefined {
  return imageCredits[speciesId];
}

/**
 * The line printed under the photo, and the `creditText` in the graph.
 *
 * One function so the visible credit and the machine-readable one cannot say
 * different things about the same file.
 */
export function creditText(credit: ImageCredit): string {
  const who = credit.creator ?? 'Unknown author';
  return `${who} · ${credit.licenseName} · Wikimedia Commons`;
}

/** `copyrightNotice`: who holds the rights, not who to credit. */
export function copyrightNotice(credit: ImageCredit): string {
  if (credit.licenseName === 'Public domain')
    return credit.creator
      ? `Public domain — ${credit.creator}`
      : 'Public domain';
  return `© ${credit.creator ?? 'Unknown author'}`;
}
