export interface Type {
  id: number;
  name: string;
  center: 'Head' | 'Heart' | 'Gut';
  synthesis: string;
  coreDesire: string;
  coreFear: string;
  gamingStyle: {
    role: string;
    strengths: string;
    weaknesses: string;
    advantage: string;
  };
}

export interface GameStrategy {
  id: string;
  game: string;
  genre: string;
  thumbnail: string;
  description: string;
  advice: {
    typeId: number;
    tip: string;
  }[];
}
