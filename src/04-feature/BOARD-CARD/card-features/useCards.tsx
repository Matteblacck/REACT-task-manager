
import { useMemo } from 'react';
import { Board } from '../../../05-entities/boardInterfaces';

export const useCards = (board: Board) => {
  const allCards = useMemo(() => {
    const cards = [...board.cards];
    board.cards.forEach((card) => {
      const existingIndex = cards.findIndex(c => c.id === card.id);
      if (existingIndex !== -1) {
        cards[existingIndex] = {
          ...cards[existingIndex],
          elements: [...card.elements],
        };
      } else {
        cards.push({ ...card, elements: [...card.elements] });
      }
    });
    return cards;
  }, [board.cards]);

  return { allCards };
};