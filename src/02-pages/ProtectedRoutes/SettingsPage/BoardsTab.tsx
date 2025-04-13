import styled from "styled-components";
import { useGetTags } from "../../../04-feature/BOARD-CARD/board-features/useGetTags";
import Button from "../../../06-shared/Button";
import { UseManageTags } from "../../../04-feature/SETTINGS/useManageTags";
import { useState } from "react";
import Input from "../../../06-shared/Input";
import { HexColorPicker } from "react-colorful"; // Импортируем компонент
import CardPreview from "../../../03-widgets/CardPreview";
import { useCardCustomization } from "../../../04-feature/SETTINGS/useCardCustomization";

const Subsection = styled.div`
  background-color: var(--color-over);
  border-radius: 15px;
  padding: 20px;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  font-size: 20px;
`;
const TagItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  background-color: var(--color-over);
  border: 1px solid var(--color-minor);
  border-radius: 10px;
  padding: 5px 10px;
  position: relative;
  transition: all 0.2s ease-in-out;
  opacity: 1;

  &:hover {
    padding-right: 30px;
    cursor: pointer;
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  color: var(--color-minor);
  font-size: 16px;
  opacity: 0;
  transition: opacity 0.2s ease;

  &:hover {
    color: var(--color-error);
  }

  ${TagItem}:hover & {
    opacity: 1;
  }
`;

const StyledButton = styled(Button)`
  height: 40px;
  font-size: 20px;
`;

const ParSelect = styled.select`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: var(--color-over, #f0f0f0);
  border: 1px solid var(--color-minor, #ccc);
  border-radius: 10px;
  padding: 5px 8px;
  font-size: 16px;
  color: var(--color-text, #333);
  margin-left: 10px;
  min-width: 120px;
  cursor: pointer;
  background-image: url("data:image/svg+xml;utf8,<svg fill='gray' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px 16px;

  &:hover {
    background-color: var(--color-bg);
  }

  &:focus {
    outline: none;
    border-color: var(--color-accent, #ff9800);
    box-shadow: 0 0 0 2px rgba(255, 152, 0, 0.3);
  }
`;



// ... (импорты остаются без изменений)

export const BoardsTab = () => {
  const tags = useGetTags();
  const [isTagAdding, setIsTagAdding] = useState(false);
  const [newTagColor, setNewTagColor] = useState("#ffffff");
  const [newTagName, setNewTagName] = useState("");
  const [deletedTags, setDeletedTags] = useState<string[]>([]);

  // Получаем методы и текущие значения из хука
  const { 
    setCardWidth, 
    setCardFontSize, 
    setCardBorderRadius,
    currentWidth, 
    currentFontSize,
    currentBorderRadius 
  } = useCardCustomization();

  // Обработчики тегов
  const { handleAddTag, handleDeleteTag } = UseManageTags();

  const handleColorChange = (color: string) => {
    setNewTagColor(color);
  };

  const handleSmoothDelete = (name: string) => {
    setDeletedTags((prev) => [...prev, name]);
    setTimeout(() => {
      handleDeleteTag(name);
      setDeletedTags((prev) => prev.filter((n) => n !== name));
    }, 300);
  };

  const handleAddNewTag = () => {
    handleAddTag({
      name: newTagName,
      color: newTagColor,
    });
    setIsTagAdding(false);
    setNewTagName("");
    setNewTagColor("#ffffff");
  };

  // Опции для селектов
  const widthOptions = ['Compact', 'Medium', 'Wide'];
  const fontSizeOptions = ['Small', 'Medium', 'Large'];
  const borderRadiusOptions = [ 'Square','Soft', 'Medium', 'Round']; // добавлено

  return (
    <>
      <Subsection>
        <h4 className="pb-3">Tags customization</h4>
        <TagsContainer className="d-flex gap-1 text-wrap">
          {tags.map((tag) => (
            <TagItem key={tag.name} 
              style={{
                opacity: deletedTags.includes(tag.name) ? 0 : 1,
                transform: deletedTags.includes(tag.name)
                  ? "translateX(20px)"
                  : "translateX(0)",
                transition: "all 0.3s ease-in-out",
              }}>
              <div
                style={{
                  backgroundColor: tag.color,
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  marginRight: "5px",
                }}
              />
              <span>{tag.name}</span>
              <DeleteButton onClick={() => handleSmoothDelete(tag.name)}>
                &#10005;
              </DeleteButton>
            </TagItem>
          ))}
        </TagsContainer>
        
        {isTagAdding ? (
          <div className="d-flex flex-column">
            <div className="pt-2" style={{ width: "100%" }}>
              <div className="pb-3">
                <Input
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  placeholder="Tag Name"
                />
              </div>
              <div className="pb-3">
                <HexColorPicker
                  color={newTagColor}
                  onChange={handleColorChange}
                  style={{ width: "100%" }}
                />
              </div>
              
              <div className="d-flex justify-content-between">
                <StyledButton onClick={() => setIsTagAdding(false)}>
                  Cancel
                </StyledButton>
                <StyledButton
                  onClick={handleAddNewTag}
                  disabled={!newTagName.trim()}
                >
                  Add Tag
                </StyledButton>
              </div>
            </div>
          </div>
        ) : (
          <StyledButton onClick={() => setIsTagAdding(true)}>
            + Add
          </StyledButton>
        )}
      </Subsection>

      {/* Секция настройки карточки */}
      <Subsection className='mt-4'>
        <h4 className="pb-3">Board customization</h4>
        <div className="d-flex flex-column">
          <div className="d-flex gap-4 flex-wrap content-align-center">
            {/* Ширина карточки */}
            <div className="d-flex align-items-center">
              <h3>Width:</h3>
              <ParSelect 
                value={currentWidth}
                onChange={(e) => setCardWidth(e.target.value.toLowerCase() as 'compact' | 'medium' | 'wide')}
              >
                {widthOptions.map(option => (
                  <option key={option} value={option.toLowerCase()}>
                    {option}
                  </option>
                ))}
              </ParSelect>
            </div>
            
            {/* Размер шрифта */}
            <div className="d-flex align-items-center">
              <h3>Font size:</h3>
              <ParSelect 
                value={currentFontSize}
                onChange={(e) => setCardFontSize(e.target.value.toLowerCase() as 'small' | 'medium' | 'large')}
              >
                {fontSizeOptions.map(option => (
                  <option key={option} value={option.toLowerCase()}>
                    {option}
                  </option>
                ))}
              </ParSelect>
            </div>
            
            {/* Заглушки для будущих настроек */}
            <div className="d-flex align-items-center">
              <h3>Border:</h3>
              <ParSelect
               value={currentBorderRadius}
               onChange={(e) => setCardBorderRadius(e.target.value.toLowerCase() as 'square' | 'soft' | 'medium' | 'round')}
              >
              {borderRadiusOptions.map(option => (
                  <option key={option} value={option.toLowerCase()}>
                    {option}
                  </option>
                ))}
              </ParSelect>
            </div>
          </div>
          
          {/* Превью карточки */}
          <div className="pt-4 d-flex justify-content-center align-items-center">
            <CardPreview/>
          </div>
        </div>
      </Subsection>
    </>
  );
};