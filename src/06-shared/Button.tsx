import styled from "styled-components";
import React, { forwardRef } from 'react';

// Стилизация кнопки
const StyledButton = styled.button`
  background-color: transparent;
  color: ${(props) => props.theme.buttonText};
  height: 35px;
  border-radius: 5px;
  border: 1px solid #d2d1d1;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  white-space: nowrap;
  padding: 0 12px; /* Отступы слева и справа */

  /* Эффект при наведении */
  &:hover {
    background-color: rgba(255, 255, 255, 0.1); /* Светлый фон при наведении */
  }

  /* Эффект при нажатии */
  &:active {
    transform: scale(0.95); /* Уменьшение размера кнопки при нажатии */
    background-color: rgba(255, 255, 255, 0.2); /* Более яркий фон при клике */
  }
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

// Обертываем компонент в forwardRef
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...props }, ref) => {
  return (
    <StyledButton ref={ref} {...props}>
      {children}
    </StyledButton>
  );
});

export default Button;