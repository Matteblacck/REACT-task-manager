export interface CardProps {
    title: string;
    id: string;
    isAdding: boolean;
    toggleAdding: (cardId: string) => void;
  }