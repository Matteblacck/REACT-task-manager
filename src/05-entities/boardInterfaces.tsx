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
    members: { id: string; role: string }[];
    createdAt: string;
    cards: Card[];
  }