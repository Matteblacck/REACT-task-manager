
import { useState } from 'react';

export const useCardElements = () => {
  const [addingColumns, setAddingColumns] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleAdding = (column: string) => {
    setAddingColumns(prev => ({ ...prev, [column]: !prev[column] }));
  };

  return { addingColumns, toggleAdding };
};