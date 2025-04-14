import styled from "styled-components";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useGetTags } from "../../../../../04-feature/BOARD-CARD/board-features/useGetTags";
import { UseManageTags } from "../../../../../04-feature/SETTINGS/useManageTags";
import Button from "../../../../../06-shared/Button";
import Input from "../../../../../06-shared/Input";

// Стили
const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  font-size: 20px;
`;

const SectionTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background: var(--color-accent);
    border-radius: 3px;
  }
`;

const TagItem = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border: 2px solid ${({ $color }) => $color};
  border-radius: 10px;
  padding: 5px 10px;
  background-color: ${({ $color }) => $color};
  color: var(--color-bg);
  position: relative;
  transition: all 0.2s ease-in-out;
  opacity: 1;

  &:hover {
    padding-right: 30px;
    cursor: pointer;
  }

  span {
    color: var(--color-bg);
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  color: var(--color-bg);
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
  height: 35px;
  font-size: 20px;
`;

export const TagsSection = () => {
  const tags = useGetTags();
  const [isTagAdding, setIsTagAdding] = useState(false);
  const [newTagColor, setNewTagColor] = useState("#ffffff");
  const [newTagName, setNewTagName] = useState("");
  const [deletedTags, setDeletedTags] = useState<string[]>([]);

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
    handleAddTag({ name: newTagName, color: newTagColor });
    setIsTagAdding(false);
    setNewTagName("");
    setNewTagColor("#ffffff");
  };

  return (
    <>
      <SectionTitle className="pb-3">Tags customization</SectionTitle>
      <TagsContainer className="d-flex gap-1 text-wrap">
        {tags.map((tag) => (
          <TagItem
            key={tag.name}
            $color={tag.color}
            style={{
              opacity: deletedTags.includes(tag.name) ? 0 : 1,
              transform: deletedTags.includes(tag.name) ? "translateX(20px)" : "translateX(0)",
              transition: "all 0.3s ease-in-out",
            }}
          >
            <span>{tag.name}</span>
            <DeleteButton onClick={() => handleSmoothDelete(tag.name)}>&#10005;</DeleteButton>
          </TagItem>
        ))}
      </TagsContainer>

      {isTagAdding ? (
        <div className="d-flex flex-column pt-2" style={{ width: "100%" }}>
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
            <StyledButton onClick={() => setIsTagAdding(false)}>Cancel</StyledButton>
            <StyledButton onClick={handleAddNewTag} disabled={!newTagName.trim()}>
              Add Tag
            </StyledButton>
          </div>
        </div>
      ) : (
        <StyledButton onClick={() => setIsTagAdding(true)}>+ Add</StyledButton>
      )}
    </>
  );
};