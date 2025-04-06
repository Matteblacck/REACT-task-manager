import { useState } from 'react';

export const useCardElements = () => {
  const [addingColumns, setAddingColumns] = useState<{
    [key: string]: boolean; // key теперь будет cardId
  }>({});

  const toggleAdding = (cardId: string) => {
    setAddingColumns(prev => ({ 
      ...prev, 
      [cardId]: !prev[cardId] 
    }));
  };

  return { addingColumns, toggleAdding };
};