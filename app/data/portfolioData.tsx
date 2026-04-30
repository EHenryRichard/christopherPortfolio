export interface PortfolioItem {
  id: number;
  videoId: number;
  videoSrc: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  client: string;
  services: string[];
  tags: string[];
  year: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    videoId: 1,
    videoSrc: '/videos/project-01.mp4',
    title: 'Voice Over Poem',
    subtitle: 'Fast Paced Edits',
    description:
      'A spoken word piece brought to life through rapid-fire editing. Every cut lands on beat, every transition amplifies the emotion — turning a poem into a visual experience that hits as hard as it sounds.',
    category: 'Voice Artistry',
    client: 'Personal Work',
    services: ['Video Editing', 'Voice Artistry', 'Sound Design'],
    tags: ['Voice Over', 'Fast Paced Cuts', 'Spoken Word', 'Creative Editing'],
    year: '2024',
  },
  {
    id: 2,
    videoId: 2,
    videoSrc: '/videos/project-02.mp4',
    title: 'Chemical Studios',
    subtitle: 'Product Teaser with Motion Graphics',
    description:
      'A high-energy brand marketing video for Chemical Studios — built around kinetic motion graphics, sharp transitions, and a visual identity that commands attention. Designed to move product and move people.',
    category: 'Brand Marketing',
    client: 'Chemical Studios',
    services: ['Video Editing', 'Motion Graphics', 'Brand Marketing'],
    tags: ['Motion Graphics', 'Brand Video', 'Product Teaser', 'Marketing'],
    year: '2024',
  },
];
