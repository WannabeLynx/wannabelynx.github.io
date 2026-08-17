/**
 * Museum data + shared palette.
 *
 * This file is the single source of truth for what stands in the room.
 * To add an exhibit: append one entry to `EXHIBITS`. Everything else
 * (geometry, platform, placard, proximity, info panel) is derived from it.
 */

/** Stellar Cartography palette — mirrors the site's CSS custom properties. */
export const PALETTE = {
  gold: 0xf3c969, // --primary
  space: 0x070b14, // --background
  floor: 0x0a1120,
  wall: 0x0c1526,
  dome: 0x05070f,
  foreground: 0xeaf0fa, // --foreground
  cool: 0x96b4dc, // --border hue
} as const;

/** Which prefab object sits on the platform. */
export type ExhibitKind = 'earth' | 'planet' | 'rocket' | 'satellite';

export interface ExhibitLink {
  label: string;
  href: string;
}

export interface ExhibitData {
  id: string;
  kind: ExhibitKind;
  /** Catalog code shown on the placard, e.g. "OBJ-01". */
  designation: string;
  title: string;
  /** Short one-line tag, e.g. "Game · Geography". */
  category: string;
  description: string;
  link?: ExhibitLink;
  /** Platform centre on the floor [x, y, z]; keep y at 0. */
  position: [number, number, number];
}

/**
 * Exhibits arranged in a ring around the rotunda, each facing the centre.
 * Spawn point is the origin looking down -Z, so `earth` is straight ahead.
 */
export const EXHIBITS: ExhibitData[] = [
  {
    id: 'flag-quiz',
    kind: 'earth',
    designation: 'OBJ-01',
    title: "Rory's Flag & Domain Quiz",
    category: 'Game · Geography',
    description:
      'An interactive geography quiz — identify countries by their flags or domain extensions on a world map.',
    link: { label: 'Launch quiz', href: 'https://coderory.com/guessgame' },
    position: [0, 0, -11],
  },
  {
    id: 'polyrhythmic',
    kind: 'rocket',
    designation: 'OBJ-02',
    title: 'Polyrhytmic',
    category: 'Generative · Audio',
    description:
      'A generative music toy — a tone triggers as each point completes its loop, weaving a mesmerising pattern.',
    link: { label: 'Open demo', href: 'https://coderory.com/polyrhythmic' },
    position: [11, 0, 0],
  },
  {
    id: 'rory-components',
    kind: 'planet',
    designation: 'OBJ-04',
    title: 'Rory Components',
    category: 'Library · Open Source',
    description: 'My small Vue component library, published to npm — still adding more.',
    link: { label: 'View on npm', href: 'https://www.npmjs.com/package/rory-components' },
    position: [0, 0, 11],
  },
  {
    id: 'graphql-viewer',
    kind: 'satellite',
    designation: 'OBJ-03',
    title: 'GraphQL Viewer',
    category: 'Chrome Extension · DX',
    description: 'A Chrome extension I built at work to better visualise GraphQL data.',
    link: {
      label: 'Chrome Web Store',
      href: 'https://chromewebstore.google.com/detail/rorys-graphql-viewer/fmolodpnmbjgejgbfmjnbhojiokoiijd',
    },
    position: [-11, 0, 0],
  },
];
