import styled from "styled-components";
import { useCreateBoard } from "../../04-feature/BOARD-PAGE/useCreateBoard";
import Input from "../../06-shared/Input";
import Tags from "../Tags";
import { useTags } from "../../04-feature/BOARD-PAGE/useTags";
import Button from "../../06-shared/Button";
import { useState } from "react";

// Стили
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background: rgba(0, 0, 0, 0.1); */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContainer = styled.div`
  background: var(--color-bg);
  padding: 2.5rem;
  border-radius: 12px;
  width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  text-align: center;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: slideIn 0.3s ease;

  @keyframes slideIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
const StyledButton = styled(Button)`
  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;
const ModalActions = styled.div`
  display: flex;
  width: 60%;
  justify-content: space-between;
  margin: 0 auto;
`;
interface CreateBoardModalProps {
  onClose: () => void;
}
// Компонент
const CreateBoardModal: React.FC<CreateBoardModalProps> = ({onClose}: CreateBoardModalProps) => {
  
  const [boardName, setBoardName] = useState('')
  const finalBoardName = boardName.trim() || "New Board";
  const { selectedTags, handleTagSelection } = useTags();
  const { handleBoardCreate } = useCreateBoard({boardName: finalBoardName, selectedTags: selectedTags});
  const handleCreateBoardAndClose = () => {
    handleBoardCreate();
    onClose();
  };
  
  

  
  return (
    <ModalOverlay>
      <ModalContainer>
        <div>
          <h1 className="text-start pb-2">Enter the name:</h1>
          <Input placeholder="Name..." value={boardName} onChange={(e) => setBoardName(e.target.value)}></Input>
        </div>
        <div className="pt-2">
          <h1 className="text-start pb-2">Tags:</h1>
          <Tags selectedTags={selectedTags} onToggleAdd={handleTagSelection} />
        </div>
        <ModalActions className="pt-5">
          <div>
            <StyledButton onClick={onClose}>Cancel</StyledButton>
          </div>
          <div>
            <StyledButton onClick={handleCreateBoardAndClose}>
              Add Board
            </StyledButton>
          </div>
        </ModalActions>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default CreateBoardModal;
