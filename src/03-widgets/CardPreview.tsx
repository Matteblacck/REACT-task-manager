import styled from "styled-components";
import Button from "../06-shared/Button";
import '../06-shared/cardParams.css'

const CardColumn = styled.div`
  border: 1px solid #ff9800;
  border-radius: var(--card-borderRadius);
  height: fit-content;
  padding: 15px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  background-color: var(--color-bg);
  width: var(--card-width);
  transition: 0.2s all ease-in;
`;

const CardTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 15px;
`;

const TasksList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const TaskText = styled.span`
  flex-grow: 1;
  word-break: break-word;
`;

const TasksListItem = styled.li`
  font-size: var(--card-fontSize);
  background-color: transparent;
  border: 1.5px solid #d2d1d1;
  border-radius: 10px;
  margin-bottom: 8px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
`;

const StyledButton = styled(Button)`
  width: 100%;
  font-size: 15px;
  margin-top: 10px;
  border-radius: 10px;
`;

export default function CardPreview() {
  return (
    <CardColumn>
      <CardTitle>Card Preview</CardTitle>
      
      <TasksList>
        <TasksListItem>
          <TaskText>First example task</TaskText>
        </TasksListItem>
        
        <TasksListItem>
          <TaskText>Second example task</TaskText>
        </TasksListItem>
      </TasksList>

      <StyledButton>
        + Add new
      </StyledButton>
    </CardColumn>
  );
}