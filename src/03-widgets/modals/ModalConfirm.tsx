import styled from 'styled-components';
import Button from '../../06-shared/Button'

// styled
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: var(--color-bg);
  padding: 2.5rem;
  border-radius: 8px;
  width: 400px;
  text-align: center;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  margin-left:4rem;
  margin-right:4rem;
`;
//styled^

interface ModalProps {
    onConfirm: () => void
    onCancel: () => void
}

const Modal: React.FC<ModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <ModalOverlay>
      <ModalContainer>
        <div>You sure you want to delete this board? <br></br>This action cannot be undone!</div>
        <ModalButtonContainer>
            <Button style={{ border: "1px solid #ff9800", color: "#ff9800" }} onClick={onConfirm}>
            Yes
            </Button>
            <Button style={{ border: "1px solid #E74C3C", color: "#E74C3C" }} onClick={onCancel}>
            No
            </Button>
        </ModalButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;