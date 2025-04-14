import styled from "styled-components";
import React, { forwardRef } from 'react';

const StyledSelect = styled.select`
  background-color: var(--color-bg);
  color: var(--color-text);
  height: 35px;
  border-radius: 5px;
  border: 1px solid var(--color-minor);
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  white-space: nowrap;
  padding: 0 32px 0 12px; /* Увеличен правый отступ */
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23666666'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center; /* Позиция стрелки с отступом */
  background-size: 16px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &:active {
    transform: scale(0.95);
    background-color: rgba(255, 255, 255, 0.2);
  }

  &:focus {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 2px rgba(0, 119, 255, 0.1);
  }
`;

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({ children, ...props }, ref) => {
  return (
    <StyledSelect ref={ref} {...props}>
      {children}
    </StyledSelect>
  );
});

export default Select;