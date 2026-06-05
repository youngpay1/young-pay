export type CollabType = 'artist' | 'venue' | 'brand';

export interface Collaboration {
  id: string;
  name: string;
  type: CollabType;
  city?: string;
  year?: string;
  images?: string[];
  videos?: string[];
}

export const collaborations: Collaboration[] = [
  {
    id: 'travis-scott',
    name: 'Travis Scott',
    type: 'artist',
    city: 'Frankfurt',
    year: '2023',
    images: ['/collaborations/travis-scott.jpg'],
  },
  {
    id: 'shoreline-mafia',
    name: 'Shoreline Mafia',
    type: 'artist',
    city: 'Europe',
    year: '2022',
    images: ['/collaborations/shoreline-mafia.jpg'],
  },
  {
    id: 'pierre-bourne',
    name: 'Pierre Bourne',
    type: 'artist',
    city: 'Europe',
    year: '2023',
    images: ['/collaborations/pierre-bourne.jpg'],
  },
  {
    id: 'madeinTYO',
    name: 'MadeinTYO',
    type: 'artist',
    city: 'Europe',
    year: '2022',
    images: ['/collaborations/madeinTYO.jpg'],
  },
  {
    id: 'night-lovell',
    name: 'Night Lovell',
    type: 'artist',
    city: 'Europe',
    year: '2022',
    images: ['/collaborations/night-lovell.jpg'],
  },
  {
    id: 'lancey-foux',
    name: 'Lancey Foux',
    type: 'artist',
    city: 'Berlin',
    year: '2023',
    images: ['/collaborations/lancey-foux.jpg'],
  },
  {
    id: 'jay1',
    name: 'Jay 1',
    type: 'artist',
    city: 'Europe',
    year: '2023',
    images: ['/collaborations/jay1.jpg'],
  },
  {
    id: 'slimesito',
    name: 'Slimesito',
    type: 'artist',
    city: 'Frankfurt',
    year: '2023',
    images: ['/collaborations/slimesito.jpg'],
  },
  {
    id: 'pashani',
    name: 'Pashanim',
    type: 'artist',
    city: 'Europe',
    year: '2023',
    images: ['/collaborations/pashani.jpg'],
  },
  {
    id: 'f1lthy',
    name: 'F1lthy',
    type: 'artist',
    images: ['/collaborations/f1lthy.jpg'],
  },
  {
    id: 'rocket',
    name: 'Rocket',
    type: 'artist',
    images: ['/collaborations/rocket.jpg'],
  },
  {
    id: '9mice',
    name: '9mice',
    type: 'artist',
    images: ['/collaborations/9mice.jpg'],
  },
  {
    id: 'elias',
    name: 'Elias',
    type: 'artist',
    city: 'Europe',
    year: '2023',
    images: ['/collaborations/elias.jpg'],
  },
  {
    id: 'lildrughill',
    name: 'Lildrughill',
    type: 'artist',
    images: ['/collaborations/lildrughill.jpg'],
  },
  {
    id: 'alblak52',
    name: 'Alblak52',
    type: 'artist',
    images: ['/collaborations/alblak52.jpg'],
  },
  {
    id: 'pepel-nahudi',
    name: 'Pepel Nahudi',
    type: 'artist',
    images: ['/collaborations/pepel-nahudi.jpg'],
  },
  {
    id: 'dj-rennessy',
    name: 'DJ Rennessy',
    type: 'artist',
    images: ['/collaborations/dj-rennessy.jpg'],
  },
  {
    id: 'sn8ke',
    name: 'Sn8ke',
    type: 'artist',
    images: ['/collaborations/sn8ke.jpg'],
  },
  {
    id: 'beezy-b',
    name: 'Beezy B',
    type: 'artist',
    images: ['/collaborations/beezy-b.jpg'],
  },
  {
    id: 'paris',
    name: 'Paris Shadows',
    type: 'artist',
    city: 'Frankfurt',
    images: ['/collaborations/paris.jpg'],
  },
  {
    id: 'waveside',
    name: 'Waveside',
    type: 'brand',
    images: ['/collaborations/waveside.webp'],
  },
  {
    id: 'trapcloud',
    name: 'Trapcloud',
    type: 'brand',
    images: ['/collaborations/trapcloud.png'],
  },
  {
    id: 'traphole',
    name: 'Traphole',
    type: 'venue',
    city: 'Frankfurt',
    images: ['/collaborations/trap-hole.jpg'],
  },
  {
    id: 'soho-house',
    name: 'Soho House',
    type: 'venue',
    city: 'Berlin',
    images: ['/collaborations/soho-house.jpg'],
  },
  {
    id: 'barrys',
    name: "Barry's",
    type: 'brand',
    images: ['/collaborations/barrys.jpg'],
  },
  {
    id: 'trap-or-die',
    name: 'Trap or Die',
    type: 'brand',
    images: ['/collaborations/trap-or-die.jpg'],
  },
  {
    id: 'emt',
    name: 'EMT',
    type: 'brand',
    images: ['/collaborations/emt.jpg'],
  },
];
