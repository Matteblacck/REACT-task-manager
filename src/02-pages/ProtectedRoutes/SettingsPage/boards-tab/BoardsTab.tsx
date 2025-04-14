import styled from "styled-components";
import { TagsSection } from "./sections/TagsSection";
import { BoardsSection } from "./sections/BoardsSection";
const Subsection = styled.div`
  background-color: var(--color-over);
  border-radius: 15px;
  padding: 20px;
`;


export const BoardsTab = () => {
  return (
    <>
      <Subsection>
       <TagsSection/>
      </Subsection> 

      {/* Секция настройки карточки */}
      <Subsection className='mt-4'>
        <BoardsSection/>
      </Subsection>
    </>
  );
};