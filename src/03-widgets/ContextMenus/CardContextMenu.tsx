import React, { useRef, useState, useEffect } from 'react';
import { MenuItem, ControlledMenu } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { FaEllipsisH } from 'react-icons/fa';
import styled from 'styled-components';
import Button from '../../06-shared/Button';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateBoardCards } from '../../01-app/redux/slices/boardsSlice';
import { AppDispatch } from '../../01-app/redux/store';
import { Board } from '../../05-entities/boardInterfaces';

const DotsButton = styled(Button)`
  padding: 5px 10px;
  border: none;
  color: var(--color-text);
  background-color: transparent;
  
  &:hover {
    background-color: var(--color-over);
  }
`;

const CloseButton = styled.button`
  border-radius: 4px;
  background-color: transparent;
  border: none;
  color: var(--color-text);
  
  &:hover {
    background-color: var(--color-over);
  }
`;

const CrossIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
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
  color: var(--color-text);
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 8px;
`;

const StyledMenuItem = styled(MenuItem)`
  color: var(--color-text);
  background-color: var(--color-bg);
  
  &:hover {
    background-color: var(--color-over);
  }
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

  const updateMenuPosition = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setMenuPosition({
        x: rect.left + window.scrollX,
        y: rect.bottom + window.scrollY,
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      updateMenuPosition();
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
    const updatedCards = board.cards.filter(card => card.id !== cardId);
    dispatch(updateBoardCards({ boardId, cards: updatedCards }));
  };

  const handleCardNameEdit = () => {
    onEditName();
    setOpen(false);
  }

  return (
    <div>
      <DotsButton
        ref={ref}
        onClick={() => {
          updateMenuPosition();
          setOpen(true);
        }}
      >
        <FaEllipsisH size={15} />
      </DotsButton>

      <ControlledMenu
        state={isOpen ? 'open' : 'closed'}
        anchorPoint={menuPosition || undefined}
        onClose={() => setOpen(false)}
        align="end"
        direction="bottom"
        menuStyle={{
          backgroundColor: 'var(--color-bg)',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.30)',
          padding: '8px 0',
          border: '1px solid var(--color-border)',
        }}
      >
        <MenuHeader>
          <h1 style={{ color: 'var(--color-minor)' }}>List actions</h1>
          <CloseButton onClick={() => setOpen(false)}><CrossIcon /></CloseButton>
        </MenuHeader>
        <StyledMenuItem onClick={handleCardDelete}>Delete</StyledMenuItem>
        <StyledMenuItem onClick={handleCardNameEdit}>Edit name</StyledMenuItem>
        <StyledMenuItem onClick={() => alert('Action selected')}>Action</StyledMenuItem>
      </ControlledMenu>
    </div>
  );
};

export default ContextMenu;