export interface CardElement {
    id: string;
    text: string;
    description?: string;
    priority?: string;
  }
  
  export interface Card {
    id: string;
    name: string;
    elements: CardElement[]; // или `Task[]`, если нужны более сложные задачи
  }
export interface Board {
    id: string;
    name: string;
    tags?: string[];
    members: { id: string; role: string }[];
    createdAt: string;
    cards: Card[];
  }
export type Tag = {
    name: string;
    color: string;
  };
  export const tags: Tag[] = [
    { name: 'Work', color: '#E6B800' },      // мягкий янтарный
    { name: 'Studies', color: '#D66A63' },   // пыльно-коралловый
    { name: 'Project', color: '#5DADE2' },   // мягкий голубой
    { name: 'Family', color: '#81C784' },    // светлый зелёный с серым подтоном
    { name: 'Home', color: '#F4A259' }       // пастельный оранжево-персиковый
  ];
  