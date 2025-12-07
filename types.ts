export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  isThinking?: boolean;
}

export enum NavSection {
  HOME = 'home',
  MANIFESTO = 'manifesto',
  ROADMAP = 'roadmap',
  LAB = 'lab'
}

export interface RoadmapItem {
  phase: string;
  title: string;
  description: string;
  active: boolean;
}
