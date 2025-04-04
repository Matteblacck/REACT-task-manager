import React, { useRef, useState, useEffect } from 'react';
import { MenuItem, ControlledMenu } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { FaEllipsisH } from 'react-icons/fa';
import styled from 'styled-components';
import Button from '../../06-shared/Button';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Board, updateBoardCards } from '../../01-app/redux/slices/boardsSlice';
import { AppDispatch } from '../../01-app/redux/store';

const DotsButton = styled(Button)`
  padding: 5px 10px 5px 10px;
  border: none;
  &:hover {
    background-color: #d2d1d1;
  }
`;

const CloseButton = styled.button`
  border-radius: 4px;
  background-color: transparent;
  border: none;
  &:hover {
    background-color: #d2d1d1;
  }
`;

const CrossIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
      <path d="M8 7.293l3.647-3.646a.5.5 0 1 1 .707.707L8.707 8l3.646 3.647a.5.5 0 0 1-.707.707L8 8.707l-3.647 3.646a.5.5 0 0 1-.707-.707L7.293 8 3.646 4.353a.5.5 0 1 1 .707-.707L8 7.293z"/>
  </svg>
);

const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 15px 9px 15px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 8px;
`;

const ContextMenu: React.FC<{ cardId: string, onEditName: () => void }> = ({ cardId, onEditName }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { id: boardId } = useParams()
  const board = useSelector((state: { boards: { boards: Board[] } }) =>
    state.boards.boards.find((b) => b.id === boardId)
  );
  const ref = useRef<HTMLButtonElement>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);

  // Функция для обновления позиции меню
  const updateMenuPosition = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setMenuPosition({
        x: rect.left + window.scrollX, // Учитываем горизонтальный скролл
        y: rect.bottom + window.scrollY, // Учитываем вертикальный скролл
      });
    }
  };

  // Отслеживаем скролл и ресайз, чтобы обновить позицию меню
  useEffect(() => {
    if (isOpen) {
      updateMenuPosition(); // Обновляем позицию при открытии меню
      window.addEventListener('scroll', updateMenuPosition, true);
      window.addEventListener('resize', updateMenuPosition, true);
    }

    return () => {
      window.removeEventListener('scroll', updateMenuPosition, true);
      window.removeEventListener('resize', updateMenuPosition, true);
    };
  }, [isOpen]);

  const handleCardDelete = () => {
    if (!board || !boardId) return;
    const updatedCards = board.cards.filter(card => card.id !== cardId); // Фильтруем по id
    dispatch(updateBoardCards({ boardId, cards: updatedCards }));
  };
  const handleCardNameEdit = () => {
    onEditName(); // Вызываем функцию редактирования имени заметки
    setOpen(false); // Закрываем меню
  }

  return (
    <div>
      <DotsButton
        ref={ref}
        onClick={() => {
          updateMenuPosition(); // Обновляем позицию перед открытием меню
          setOpen(true);
        }}
      >
        <FaEllipsisH size={15} />
      </DotsButton>

      <ControlledMenu
        state={isOpen ? 'open' : 'closed'}
        anchorPoint={menuPosition || undefined} // Используем anchorPoint для позиционирования
        onClose={() => setOpen(false)}
        align="end"
        direction="bottom"
        menuStyle={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.30)',
          padding: '8px 0',
        }} // Стили для меню
      >
        <MenuHeader>
          <h1 style={{ color: 'gray' }}>List actions</h1>
          <CloseButton onClick={() => setOpen(false)}><CrossIcon /></CloseButton>
        </MenuHeader>
        <MenuItem onClick={handleCardDelete}>Delete</MenuItem>
        <MenuItem onClick={handleCardNameEdit}>Edit name</MenuItem>
        <MenuItem onClick={() => alert('Пункт 3 выбран')}>Пункт 3</MenuItem>
      </ControlledMenu>
    </div>
  );
};

export default ContextMenu;