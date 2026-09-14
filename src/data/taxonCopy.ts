/**
 * Long-form copy for the 27 taxa above species level.
 *
 * whales.json carries a `description` for every species but leaves every
 * order/suborder/family/genus blank, which left those 27 pages as a heading
 * and a grid of cards. This module is where their prose lives, kept out of
 * whales.json so the dataset stays a taxonomy rather than a manuscript.
 *
 * `summary` is one sentence — it renders as the page's standfirst and is what
 * the meta description is built from, so it should read as a complete thought
 * inside ~150 characters. `body` is the page's own content: paragraphs that
 * exist on no other page on the site.
 *
 * Deliberately free of species counts and other figures the dataset already
 * knows — those are rendered from whales.json so the two cannot disagree.
 */

export interface TaxonCopy {
  /** One sentence. Standfirst on the page, and the seed of its meta description. */
  summary: string;
  /** Unique body prose, one string per paragraph. */
  body: string[];
}

export const TAXON_COPY: Record<string, TaxonCopy> = {
  /* ---------------------------------------------------------------- order */

  cetacea: {
    summary:
      'The order of fully aquatic mammals — whales, dolphins and porpoises — which returned to the sea from four-legged ancestors around 50 million years ago.',
    body: [
      'Cetacea is the mammalian order containing whales, dolphins and porpoises. Fossil and molecular evidence place it firmly inside Artiodactyla, the even-toed ungulates, with hippopotamuses as its closest living relatives — a grouping named Whippomorpha. The move from land to water is unusually well documented for so complete a transformation: a sequence of Eocene fossils from what is now Pakistan and India records a wolf-sized amphibious predator becoming an obligate swimmer over roughly fifteen million years.',
      'Every living cetacean shares a suite of adaptations built on that history. The skull is telescoped so the nostrils sit on top of the head as a blowhole; the forelimbs are flippers with the finger bones still inside them; the hind limbs are gone, leaving a pair of unattached pelvic bones floating in muscle; and the tail ends in horizontal flukes that have no bony support at all. Blubber replaces fur for insulation, and countercurrent heat exchangers in the flippers and flukes let a warm-blooded animal live in near-freezing water.',
      'Two suborders survive. Mysticeti feed by filtering prey through baleen; Odontoceti keep their teeth and hunt individual animals, navigating and finding them by echolocation. Around ninety living cetacean species are currently recognised. This atlas covers the ones conventionally called whales — all of the baleen whales, together with the sperm whales, beaked whales, beluga and narwhal — and leaves the oceanic dolphins, river dolphins and porpoises to a guide of their own.',
    ],
  },

  /* ------------------------------------------------------------ suborders */

  mysticeti: {
    summary:
      'Baleen whales strain their food through keratin plates instead of teeth, and include every one of the largest animals that has ever lived.',
    body: [
      'Mysticetes are filter feeders. In place of teeth, the upper jaw carries rows of baleen plates — keratin, the same material as fingernails, frayed along the inner edge into a mat that holds prey while water escapes. Teeth do still form in the foetus, then are resorbed before birth, a developmental fossil of their toothed ancestry. Uniquely among cetaceans they keep paired blowholes, and uniquely among large mammals the females are consistently larger than the males.',
      'How the plates are used splits the group. Rorquals lunge: pleated throats balloon open to engulf a volume of water larger than the whale itself, which is then forced back out through the baleen. Right whales and the bowhead skim continuously with the mouth held open, filtering copepods through baleen up to four metres long. The gray whale does neither, rolling onto its side on the sea floor and sucking up sediment. All of them communicate at very low frequencies, some below the range of human hearing, at wavelengths that carry across an ocean basin.',
      'Most mysticetes divide the year between high-latitude feeding grounds and low-latitude breeding grounds, fasting for months on stored blubber. That predictability, plus their size, made them the principal targets of industrial whaling; the group contains both the most depleted large animals on Earth and some of conservation’s clearest recoveries.',
    ],
  },

  odontoceti: {
    summary:
      'Toothed whales hunt individual prey and find it by echolocation, using a nasal sound projector unlike anything else in the animal kingdom.',
    body: [
      'Odontocetes kept their teeth and added a sense. Air driven past phonic lips in the nasal passages produces clicks, which are focused forward through the melon — a lens of acoustically graded fat — and whose echoes are received through fat bodies in the lower jaw and conducted to the ear. Building that apparatus has left the odontocete skull conspicuously asymmetric, the only such asymmetry in mammalian skulls, and reduced the paired blowholes of their ancestors to a single opening.',
      'The toothed whales in this atlas are its deep-water specialists: the sperm whales, the beaked whales, and the two Arctic members of Monodontidae. Between them they hold the mammalian records for both depth and duration of a breath-hold dive. Sustaining those dives means very high myoglobin concentrations in the muscle, collapsible lungs, and a circulation that can shut down everything but the heart and brain.',
      'Sexual dimorphism runs the opposite way to the baleen whales: males are the larger sex, sometimes dramatically so, and in the beaked whales carry tusks used against each other. Social organisation is correspondingly more elaborate, with stable matrilineal groups and vocal repertoires that differ between populations in ways that are learned rather than inherited.',
    ],
  },

  /* ------------------------------------------------------------- families */

  balaenopteridae: {
    summary:
      'The rorquals — streamlined, fast lunge-feeders whose pleated throats let them swallow a volume of water larger than themselves.',
    body: [
      'The family name comes through Latin from the Norwegian røyrkval, "furrow whale", for the ventral pleats that run from chin to navel. In a lunge those pleats unfold, the lower jaw drops to nearly ninety degrees, and the whale takes in a mass of prey-laden water that can exceed its own body mass; the throat then contracts and drives the water out through the baleen. A sensory organ at the tip of the chin, unique to rorquals and only described in 2012, appears to coordinate the whole manoeuvre.',
      'Everything else about the body follows from that: a long, streamlined shape built for the acceleration a lunge needs, a small falcate dorsal fin set far back, and comparatively short baleen. The humpback, placed in its own genus, diverges most — enormously long flippers, a stockier build, cooperative bubble-net feeding and song.',
      'Rorquals were largely out of reach of open-boat whaling: too fast to chase under sail, and dense enough to sink when killed. The steam catcher, the explosive harpoon and the factory ship removed all three protections within a few decades, and the twentieth-century industry worked through the family from largest to smallest. The consequences are still legible in the conservation status of the individual species.',
    ],
  },

  balaenidae: {
    summary:
      'Right whales and the bowhead — stout, slow, dorsal-fin-less skim feeders carrying the longest baleen of any animal.',
    body: [
      'Balaenids are built for continuous filtration rather than for speed. The rostrum is strongly arched to house baleen plates far longer than any rorqual carries — up to four metres in the bowhead — and the animal simply swims forward with its mouth open, straining copepods and krill from the water as it goes. There are no throat pleats, no dorsal fin, and the body is thick with blubber.',
      'That combination is the origin of the English name. Right whales were the right ones to hunt: slow enough to be caught from an open boat, coastal enough to be reached from one, rich enough in oil and whalebone to be worth the trip, and — because of the blubber — buoyant enough to float after being killed rather than sinking.',
      'The three Eubalaena species carry callosities, roughened patches of thickened skin on the head colonised by pale whale lice. The pattern is unique to an individual and stable for life, which has made photographic identification of entire populations possible and is why the North Atlantic right whale is one of the few large animals whose living members are known essentially one by one.',
    ],
  },

  eschrichtiidae: {
    summary:
      'A family of one: the gray whale, the only cetacean that feeds by ploughing the sea floor for buried amphipods.',
    body: [
      'Eschrichtiidae contains a single living species. It sits between the rorquals and the right whales in build and in habit — two to five short throat grooves rather than a rorqual’s dozens of pleats, no dorsal fin but a low hump followed by a series of knuckles along the tail stock, and skin mottled gray and encrusted with barnacles and whale lice to a degree found in no other whale.',
      'Its feeding is unique among cetaceans. The whale rolls onto its side, usually the right, presses its head into soft sediment and suctions up a mouthful of sea floor, straining out tube-dwelling amphipods and leaving oval pits that are visible in side-scan sonar surveys of the Bering and Chukchi shelves. The baleen on the preferred side is measurably shorter and more worn.',
      'The eastern North Pacific population makes one of the longest migrations of any mammal, an annual round trip of roughly sixteen to twenty thousand kilometres between Arctic feeding grounds and the breeding lagoons of Baja California. A separate western Pacific population remains very small. A third, Atlantic population existed into the early modern period and was gone by around 1700 — although animals have recently appeared in the Mediterranean and the North Atlantic, presumably having crossed a seasonally ice-free Northwest Passage.',
    ],
  },

  cetotheriidae: {
    summary:
      'Known from Miocene fossils and one living species: the pygmy right whale, the smallest and strangest of the baleen whales.',
    body: [
      'For most of the twentieth century the pygmy right whale sat alone in its own family, Neobalaenidae, an oddity with no obvious relatives. Morphological work published in 2012 and 2013 placed it instead inside Cetotheriidae — a family otherwise known only from Miocene fossils and assumed extinct for some two million years. On that reading the species is a living relict, the last of a lineage that was once the dominant group of baleen whales.',
      'The skeleton is unlike anything else alive. The ribs are extraordinarily broad and flattened, overlapping into an almost solid casing around the chest, and the skull combines a right whale’s arched jaw with a rorqual-like dorsal fin. Adults reach only about six and a half metres, making this the smallest of the baleen whales by a wide margin.',
      'It is circumpolar in the Southern Hemisphere between roughly 30 and 55 degrees south, and it is barely ever seen. Most of what is known comes from strandings; there is no abundance estimate for the species anywhere in its range, and its Least Concern listing reflects an absence of known threats rather than any count of animals.',
    ],
  },

  physeteridae: {
    summary:
      'The sperm whale alone — the largest toothed predator on Earth and the source of the loudest sound any animal makes.',
    body: [
      'The family is now monotypic, though it was diverse through the Miocene. Its defining structure is the head, which in a mature male is up to a third of total body length and is almost entirely a sound-production organ: the spermaceti organ and the junk, two masses of waxy oil separated by the right nasal passage, with the phonic lips at the front. Clicks generated there and focused through the junk have been measured above 230 decibels, the loudest sound produced by any animal.',
      'Functional teeth are confined to the narrow lower jaw, where they fit into sockets in the upper. They appear to matter less for feeding than the name suggests — animals with badly deformed jaws are found in good condition — and suction is thought to do most of the work. Prey is cephalopod, taken on dives that routinely pass a thousand metres and last around an hour.',
      'Sexual dimorphism is extreme even for a toothed whale: males reach sixteen to eighteen metres and roughly three times the mass of a female. Females and young live in stable matrilineal units in tropical and warm temperate water; males leave in adolescence for high latitudes and return only to breed. Units belong to vocal clans with distinct repertoires of coda click patterns, learned rather than inherited, and clans that share an ocean do not mix.',
    ],
  },

  kogiidae: {
    summary:
      'The pygmy and dwarf sperm whales — miniature relatives of Physeter that defend themselves with a cloud of ink-like fluid.',
    body: [
      'Kogiids carry a spermaceti organ and the same asymmetric nasal architecture as the sperm whale, scaled down to animals of two and a half to three and a half metres. The resemblance stops at the profile: a blunt, squared head, a strongly underslung jaw and a pale bracket-shaped mark behind the eye give them a shark-like look, and the mark is known as the false gill for that reason.',
      'Startled kogiids release a cloud of reddish-brown fluid from a sac in the lower intestine and dive away behind it — a defence otherwise found in cephalopods, and unique among mammals.',
      'They are rarely observed at sea: undemonstrative, slow at the surface, and living over deep water off the continental slope. In much of the world they are nonetheless among the cetaceans that strand most frequently, and nearly everything known about them comes from those animals. Stomach contents from strandings show them to be badly affected by ingested plastic.',
    ],
  },

  ziphiidae: {
    summary:
      'Beaked whales — the second-largest cetacean family, the deepest divers of any mammal, and by far the least observed.',
    body: [
      'Ziphiids are medium-sized whales with a pronounced beak, a pair of converging grooves on the throat, and shallow depressions into which the flippers can be tucked flush with the body. In most genera the teeth have been reduced to a single pair in the lower jaw that erupts only in adult males; the animals feed by suction and do not need them. What the tusks are for is visible on the animals themselves — mature males are covered in parallel linear scars from fighting each other, and a male’s tooth shape and position is often the only reliable way to tell one species from another.',
      'They are extreme divers. Cuvier’s beaked whale has been recorded at nearly three thousand metres and, separately, holding a dive for three hours and forty-two minutes — the deepest and the longest breath-hold dives measured in any mammal. Foraging happens far below the surface on deep-water squid, and the animals spend very little of the day where they can be seen.',
      'The consequence is a family being described in real time. Several species are known from a few dozen specimens; one, the spade-toothed whale, was not recorded alive anywhere in the world until 2010. Three species have been named or resurrected since 2014. The same acoustic sensitivity that makes them such specialised divers also makes them the group most strongly associated with mass strandings following naval mid-frequency sonar exercises.',
    ],
  },

  monodontidae: {
    summary:
      'The beluga and the narwhal — two ice-associated Arctic whales that traded a dorsal fin for the ability to swim beneath sea ice.',
    body: [
      'Monodontids are confined to Arctic and subarctic waters, and both species have replaced the dorsal fin with a low ridge or nothing at all — a fin is a liability for an animal that surfaces in cracks in the pack ice. Unusually for cetaceans their cervical vertebrae are unfused, so they can turn their heads, and both have an exceptionally mobile melon.',
      'The beluga is born slate gray and whitens over five to eight years. It is the most vocal of the large whales — whistles, clicks, chirps and creaks earned it the name sea canary from nineteenth-century whalers — and it moults, gathering in river estuaries in summer to rub its old skin off on gravel. The narwhal has no functional teeth at all except, in almost all males and about one female in seven, the left upper canine, which erupts through the lip and grows into a spiralled tusk up to three metres long. The tusk is porous, with dentinal tubules running to nerve endings, and appears to work partly as a sensory organ.',
      'Both species time their movements to the ice. That makes them among the cetaceans most directly exposed to a warming Arctic, and to the shipping, noise and industrial activity that follow the retreating ice edge. Both remain central to Inuit subsistence hunting across their range.',
    ],
  },

  /* -------------------------------------------------------------- genera */

  balaenoptera: {
    summary:
      'The rorqual genus proper, spanning the largest animal that has ever lived and the smallest of the great whales.',
    body: [
      'Balaenoptera holds the extremes of body size in the animal kingdom. The blue whale and the fin whale are the two largest animals known to have existed; the minke whales at the other end of the genus are barely a third of the fin whale’s length. All share the pleated throat, the far-set falcate dorsal fin and the long, flat rostrum of a lunge feeder, and several carry asymmetric head pigmentation — the fin whale’s white right lower jaw and dark left being the best-known example, thought to relate to how it circles prey.',
      'The genus is among the most actively revised in cetacean taxonomy. Omura’s whale was recognised as distinct in 2003, the Bryde’s whale complex has been repeatedly split, and Rice’s whale was described in 2021 from a resident Gulf of Mexico population that had been assumed to be Bryde’s whales. Fertile hybrids between blue and fin whales have been confirmed genetically, which complicates the picture further.',
    ],
  },

  megaptera: {
    summary:
      'A single species, the humpback whale, distinguished by flippers a third of its body length and by song that changes every season.',
    body: [
      'The name means "big wing", for pectoral flippers that reach up to a third of body length — proportionally the longest of any whale, and used both in manoeuvring and in striking. The rostrum and jaw carry rows of tubercles, each containing a single sensory hair, and the body is stockier and more barnacle-encrusted than any other rorqual’s.',
      'Humpbacks are the most behaviourally conspicuous of the great whales. They feed cooperatively by releasing curtains and rings of bubbles to concentrate prey, they breach more than any comparable animal, and the males produce long songs with a nested, repeating structure. A population’s song changes progressively through a breeding season and is adopted wholesale by neighbouring populations, spreading eastward across the South Pacific in successive years.',
      'The underside of the fluke is individually patterned and is raised on a deep dive, which produced global photo-identification catalogues decades before genetic methods were available. The species was reduced to a few per cent of its original numbers by twentieth-century whaling and has since recovered strongly enough to be listed as Least Concern.',
    ],
  },

  eubalaena: {
    summary:
      'The three right whales, individually identifiable for life by the pattern of callosities on the head.',
    body: [
      'Eubalaena was separated from the bowhead’s genus on a shorter head, a temperate-to-subpolar rather than Arctic distribution, and the presence of callosities. Whether it contained one species or three was argued for most of the twentieth century; genetic work published in 2000 settled it at three, corresponding to the North Atlantic, the North Pacific and the Southern Ocean.',
      'The three have fared very differently. The southern right whale was hunted hard but across a vast range and has recovered substantially. The North Atlantic right whale has not: the population numbers a few hundred, and the two things killing it — entanglement in fixed fishing gear and collisions with vessels — are both concentrated in the busy coastal shelf waters it depends on. The eastern North Pacific population may be down to the tens of animals.',
    ],
  },

  balaena: {
    summary:
      'The bowhead whale alone: an Arctic specialist with the thickest blubber, the longest baleen, and probably the longest life of any mammal.',
    body: [
      'Balaena contains one living species, and it is the only baleen whale that spends its entire life in Arctic and subarctic water. The skull is enormous and triangular in profile, up to two-fifths of body length, and strong enough to break upward through sea ice to breathe. Blubber reaches half a metre in thickness, the most of any animal, and the baleen plates are the longest of any whale.',
      'Its longevity is exceptional even by the standards of large whales. Stone and ivory harpoon points of a kind last used in the nineteenth century have been recovered from living animals, and racemisation dating of eye lens proteins has returned ages well over two hundred years. The species’ genome, sequenced in 2015, carries distinctive variants in DNA repair and cell-cycle genes that are now studied for what they say about ageing generally.',
    ],
  },

  eschrichtius: {
    summary:
      'The gray whale alone — a bottom-feeding migrant that was lost from the Atlantic three centuries ago and has lately begun reappearing there.',
    body: [
      'Eschrichtius is monotypic and morphologically isolated: no dorsal fin, a modest set of throat grooves, and a thick, mottled body carrying more barnacles and whale lice than any other cetacean. It is the only whale that makes its living from the sea floor, and the wear on its baleen records which side it habitually rolls onto.',
      'It is also the only large whale to have been driven out of an entire ocean and then to have started returning. Subfossil remains show gray whales along the coasts of Europe and eastern North America until roughly the seventeenth century, after which the Atlantic population disappeared. Since 2010 individuals have turned up in the Mediterranean, off Namibia and off the north-eastern United States — animals that had almost certainly crossed from the Pacific through a Northwest Passage now seasonally free of ice.',
    ],
  },

  caperea: {
    summary:
      'The pygmy right whale: smallest of the baleen whales, and the only living member of a family otherwise known from Miocene fossils.',
    body: [
      'Caperea takes its name from the Latin for "to wrinkle", after the wrinkled ear bone of the type specimen. The animal is small — about six and a half metres — and combines features that belong to no single group: the arched jaw and long baleen of a right whale, a falcate dorsal fin that right whales do not have, and a ribcage of broad, flattened, overlapping ribs unlike anything else alive.',
      'Its placement inside the otherwise fossil family Cetotheriidae, argued from cranial and earbone morphology in 2012–13, makes it the last survivor of a lineage that dominated the baleen whales through the Miocene. The species has essentially no commercial history and essentially no population data; it is known mainly from strandings on southern coastlines and from a small number of at-sea encounters.',
    ],
  },

  physeter: {
    summary:
      'The sperm whale: largest toothed animal on Earth, deepest-diving of the great whales, and the whale of the open-boat whaling era.',
    body: [
      'Physeter is monotypic. Its scientific name was contested for two centuries — Linnaeus named four sperm whale species in 1758, and catodon and macrocephalus were both used for the survivor — before prevailing usage settled the matter in favour of Physeter macrocephalus.',
      'The head is the animal. The spermaceti organ and the junk together form a sound projector occupying up to a third of the body, filled with a wax that liquefies and solidifies across a narrow temperature range; the same wax is what made the species commercially valuable, burning cleaner than any other whale oil and lubricating precision machinery into the twentieth century. Ambergris, a secretion formed around indigestible squid beaks, was worth more still.',
      'The social structure is matrilineal and long-lived. Females and immature animals form units of around ten that remain together for decades, sharing calf care and foraging in tropical and warm temperate water; males leave in their teens for high latitudes and return only to mate. Units associate into clans defined by their coda repertoires — patterned sequences of clicks that function as dialect, are learned rather than inherited, and keep clans sharing the same water socially separate.',
    ],
  },

  kogia: {
    summary:
      'The two small sperm whales — pygmy and dwarf — which were treated as one species until the 1960s and may yet be more than two.',
    body: [
      'Kogia was long thought to contain a single species. The dwarf sperm whale was recognised as distinct in 1966, on a shorter head, a larger dorsal fin set nearer the middle of the back, and a different tooth count. Separating the two at sea remains difficult, and a proposed third species in the Atlantic, described from the dwarf sperm whale’s range in 2021, has yet to be widely accepted.',
      'Both are undemonstrative animals of deep water beyond the continental shelf, slow at the surface and easily missed. Most specimens reach science as strandings, and the genus is disproportionately represented in stranding records worldwide relative to how rarely it is seen alive.',
    ],
  },

  ziphius: {
    summary:
      'Cuvier’s beaked whale — the most widely distributed beaked whale, and the deepest and longest-diving mammal ever recorded.',
    body: [
      'Ziphius holds a single species, and it was described from the dead. Georges Cuvier examined a fragmentary skull from the French Mediterranean coast in 1823, concluded from its density that it belonged to an extinct animal, and named it accordingly; it was another half-century before the species was recognised as alive and common.',
      'It is the most cosmopolitan of the beaked whales, present in deep water in every ocean except the high polar seas, and the one most likely to be encountered. Older males turn pale, sometimes almost white about the head, and carry heavy scarring from the two tusks at the tip of the lower jaw.',
      'Tagged animals have produced the two records that define what a breath-holding mammal can do: a dive of nearly three thousand metres, and a dive lasting three hours and forty-two minutes. The species is also the one most consistently implicated in mass strandings coincident with naval sonar exercises, and is the focus of most research into that link.',
    ],
  },

  berardius: {
    summary:
      'The giant beaked whales — the largest ziphiids, and the only ones in which both sexes erupt their tusks.',
    body: [
      'Berardius species are the largest beaked whales, reaching eleven to twelve metres, with a long tubular beak and a relatively small, rounded melon. They break the family’s usual pattern in that both sexes erupt two pairs of lower teeth rather than the males alone, and the scarring that covers mature animals is correspondingly found on females too.',
      'The genus gained a third species in 2019. Japanese whalers working off Hokkaido had long distinguished a smaller, darker animal they called karasu, the raven, from the familiar Baird’s beaked whale; genetic and morphological analysis confirmed it as distinct and it was named Berardius minimus. All three species are confined to cold water — two in the North Pacific, one circumpolar in the Southern Ocean.',
    ],
  },

  tasmacetus: {
    summary:
      'Shepherd’s beaked whale: the one ziphiid that never gave up a full set of functional teeth.',
    body: [
      'Every other beaked whale has reduced its dentition to a tusk or two in the males. Tasmacetus has not: it carries roughly seventeen to twenty-one pairs of functional teeth in the upper jaw and eighteen to twenty-eight in the lower, in addition to the enlarged apical pair that males of the family typically erupt. That retention makes it the most primitive-looking living member of the family and a key point of reference for how the rest of the group lost its teeth.',
      'It is circumpolar in cool temperate waters of the Southern Hemisphere and very seldom encountered. Confirmed at-sea sightings number in the low dozens; the species was described in 1937 from a stranding in New Zealand and was not photographed alive until the twenty-first century.',
    ],
  },

  hyperoodon: {
    summary:
      'The bottlenose whales — sociable, curious deep divers whose curiosity made the northern species a whaling target into the 1970s.',
    body: [
      'Hyperoodon contains two species, one in each hemisphere, distinguished by a bulbous melon that grows squarer and more overhanging with age, dramatically so in mature males. Unlike most beaked whales they are inquisitive around vessels and will approach and remain with a stationary boat.',
      'That behaviour, together with a habit of standing by injured companions, made the northern bottlenose whale an unusually easy target once Norwegian and British fleets turned to it in the 1880s. Hunting continued until 1973 and removed a large fraction of the North Atlantic population. The species shows strong site fidelity to particular submarine canyons — the best-studied group lives year-round in the Gully off Nova Scotia — which concentrates both the research and the risk.',
    ],
  },

  indopacetus: {
    summary:
      'Longman’s beaked whale, known from two skulls for over a century before anyone identified a living one.',
    body: [
      'The genus rests on a single species, and for most of its history on almost no material. A skull found on a Queensland beach in 1882 was described in 1926; a second, from Somalia, turned up in 1955. Nothing else was confidently referred to the species for decades, and it had a reputation as the least known large mammal in the world.',
      'Unidentified tropical beaked whales had meanwhile been sighted repeatedly in the Indian and Pacific Oceans without anyone being able to name them. Genetic work on a series of strandings published in 2003 matched those animals to the two old skulls and gave the species a living identity at last. It is now known to be a wide-ranging animal of warm Indo-Pacific waters that travels in unusually large groups for a beaked whale.',
    ],
  },

  mesoplodon: {
    summary:
      'The most species-rich genus of whales and the least observed — most of them identifiable only by the shape of a male’s single pair of teeth.',
    body: [
      'Mesoplodon means "armed with a tooth in the middle of the jaw", and that is very nearly the entire diagnostic basis of the genus. Females and juveniles of most species are close to indistinguishable from one another at sea; adult males erupt a single pair of mandibular teeth whose size, shape and position along the jaw differ enough between species to identify them, and in some cases grow over the upper jaw and physically limit how far the mouth can open.',
      'It is the largest genus of cetaceans by a wide margin and one of the most poorly known groups of large animals anywhere. Several of its species are represented by a few dozen specimens or fewer, most of them strandings; the spade-toothed whale is known from a handful, and was not seen intact until well into this century. New members continue to be added — one resurrected from synonymy in 2014, another split from a familiar species in 2021 — which makes any count of the genus provisional.',
      'What the species share is a life spent hunting squid in deep water far offshore, surfacing briefly and inconspicuously, and consequently going unrecorded. Nearly everything known about their diving and acoustic behaviour comes from tags deployed on a small number of animals in a few well-studied canyons.',
    ],
  },

  delphinapterus: {
    summary:
      'The beluga: an all-white, highly vocal Arctic whale that moults its skin each summer and can turn its head.',
    body: [
      'Delphinapterus — "dolphin without a wing" — contains one species, named for the absence of a dorsal fin. Calves are born slate gray or brownish and whiten gradually over five to eight years. The neck vertebrae are unfused, so unlike almost every other cetacean a beluga can turn its head to look at something, and the melon is soft enough to be visibly deformed at will.',
      'It is the most vocal of the large whales, with a repertoire of whistles, clicks, chirps and creaks audible through a wooden hull — the reason nineteenth-century whalers called it the sea canary. Each summer belugas gather in river estuaries in large numbers and rub themselves on gravel shallows to shed a layer of skin, an annual moult unusual among cetaceans.',
      'The species is distributed in discrete populations around the Arctic, several of which are genetically distinct and demographically independent. Some are numerous; the Cook Inlet population in Alaska has failed to recover since hunting was regulated and is listed as critically endangered.',
    ],
  },

  monodon: {
    summary:
      'The narwhal: a single species whose male carries a three-metre spiralled tusk, a canine tooth that grew through the lip.',
    body: [
      'Monodon means "one tooth", and that is literally the dentition. A narwhal has no functional teeth in its mouth. What it has is a pair of upper canines embedded in the skull, of which the left, in almost all males and roughly one female in seven, erupts through the upper lip and grows forward into a helical tusk that can exceed three metres. The spiral runs counter-clockwise in every recorded animal, and in the rare double-tusked individuals both spiral the same way.',
      'The tusk is not a typical tooth. It is porous, with dentinal tubules running from a central nerve to the outer surface, and experimental work has shown physiological responses to changes in the surrounding water — evidence for a sensory function. It is also used: drone footage has recorded narwhals striking fish with it, and the scarring and broken tips on mature males indicate it is used against each other as well.',
      'Narwhals winter in dense pack ice in Baffin Bay and the Greenland Sea, diving to fifteen hundred metres in near-total darkness for Greenland halibut, and summer in the fjords of the Canadian High Arctic and Greenland. They are among the Arctic endemics considered most sensitive to sea-ice loss and to increased shipping noise.',
    ],
  },
};
