import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Создаем StyledLink с reset-стилями
const StyledLink = styled(Link)`
  text-decoration: none; /* Убираем подчеркивание */
  color: inherit; /* Наследуем цвет текста */
  &:hover, &:focus, &:active {
    text-decoration: none; /* Убираем подчеркивание при hover/focus/active */
    color: inherit; /* Наследуем цвет текста */
  }
`;
export default StyledLink;