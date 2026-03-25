export interface Perfume {
  id: string;
  name: string;
  collection: 'Private' | 'Heritage' | 'Oud' | 'Floral';
  description: string;
  price: number;
  image: string;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  sillage: number;
}

export interface ScentRecommendation {
  recommendedScent: string;
  emotionalWhy: string;
  sillageLevel: number;
  trialVialLink: string;
}

export const PERFUMES: Perfume[] = [
  {
    id: 'royal-oud',
    name: 'Royal Oud',
    collection: 'Private',
    description: 'A majestic blend of aged Cambodian oud, saffron, and desert roses.',
    price: 245,
    image: 'https://picsum.photos/seed/oud/800/1000',
    notes: {
      top: ['Saffron', 'Bergamot'],
      heart: ['Rose', 'Geranium'],
      base: ['Cambodian Oud', 'Amber', 'Patchouli']
    },
    sillage: 5
  },
  {
    id: 'desert-musk',
    name: 'Desert Musk',
    collection: 'Heritage',
    description: 'Pure white musk infused with the warmth of golden amber.',
    price: 185,
    image: 'https://picsum.photos/seed/musk/800/1000',
    notes: {
      top: ['White Musk'],
      heart: ['Jasmine', 'Lily'],
      base: ['Amber', 'Sandalwood']
    },
    sillage: 3
  },
  {
    id: 'oriental-night',
    name: 'Oriental Night',
    collection: 'Oud',
    description: 'The mystery of an Arabian night captured in a bottle.',
    price: 210,
    image: 'https://picsum.photos/seed/night/800/1000',
    notes: {
      top: ['Spices', 'Incense'],
      heart: ['Leather', 'Tobacco'],
      base: ['Oud', 'Vanilla']
    },
    sillage: 4
  }
];
