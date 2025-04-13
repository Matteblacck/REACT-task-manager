export interface CardProps {
    title: string;
    id: string;
    isAdding: boolean;
    toggleAdding: (cardId: string) => void;
  }
// Типы
export type CardWidth = 'compact' | 'medium' | 'wide';
export type CardFontSize = 'small' | 'medium' | 'large';
export type cardBorderRadius = 'square' | 'soft' | 'medium' | 'round';
export interface CardParams {
    cardWidth: CardWidth;
    cardFontSize: CardFontSize;
    cardBorderRadius: cardBorderRadius;
  }
export const defaultCardParams: CardParams = {
  cardWidth: 'medium',
  cardFontSize: 'medium',
  cardBorderRadius: 'medium'
}
