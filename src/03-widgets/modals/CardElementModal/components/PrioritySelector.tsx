import { FaFlag } from "react-icons/fa";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch} from 'react-redux';
import { AppDispatch } from "../../../../01-app/redux/store"; // Импорт экшена
import { updateTaskPriority } from "../../../../01-app/redux/slices/boardsSlice";

const PriorityContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const PriorityHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PriorityFlags = styled.div`
  display: flex;
  gap: 10px;
`;

const FlagWrapper = styled.div`
  display: flex;
  gap: 3px;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const priorityLevels = [
  { level: "high", flags: 3, color: "#E53935" }, // Красный
  { level: "medium", flags: 2, color: "#FFB300" }, // Жёлтый
  { level: "low", flags: 1, color: "#43A047" }, // Зелёный
];
interface PrioritySelectorProps {
    taskId: string;
    boardId: string;
    currentPriority?: string;
  }
  
  const PrioritySelector: React.FC<PrioritySelectorProps> = ({
    taskId,
    boardId,
    currentPriority,
  }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [selectedPriority, setSelectedPriority] = useState<string | null>(currentPriority || null);
  
    const handlePriorityChange = (level: string) => {
      const newPriority = selectedPriority === level ? null : level;
      setSelectedPriority(newPriority);
      dispatch(updateTaskPriority({ boardId, taskId, priority: newPriority || '' }));
    };
  
    return (
      <PriorityContainer>
        <PriorityHeader>
          <FaFlag color="black" />
          <h4>Priority:</h4>
        </PriorityHeader>
  
        <PriorityFlags>
          {priorityLevels.map(({ level, flags, color }) => (
            <FlagWrapper
              key={level}
              onClick={() => handlePriorityChange(level)}
            >
              {Array.from({ length: flags }).map((_, i) => (
                <FaFlag key={i} color={selectedPriority === level ? color : "#BDBDBD"} />
              ))}
            </FlagWrapper>
          ))}
        </PriorityFlags>
      </PriorityContainer>
    );
  };
  
  export default PrioritySelector;