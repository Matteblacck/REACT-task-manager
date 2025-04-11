import styled from 'styled-components';
import Button from '../06-shared/Button';
import { FC } from 'react';
import { tags } from '../05-entities/boardInterfaces';
//styled
const TagsContainer = styled.div`
  display: flex;
  gap: 7px;
`;
//styled^


type SelectedTagsProps = {
  selectedTags: string[];
  onToggleAdd: (tag: string) => void;
};

const Tags: FC<SelectedTagsProps> = ({ selectedTags, onToggleAdd }) => {
  return (
    <TagsContainer>
      {tags.map((tag, index) => (
        <Button
          key={index} // Уникальный ключ
          id={`tag-${tag.name.toLowerCase()}-${index}`} // Уникальный id на основе имени и индекса
          style={{
            color: `${tag.color}`,
            border: `1px solid ${tag.color}`,
            padding: '5px 10px',
            borderRadius: '15px',
            backgroundColor: selectedTags.includes(tag.name) 
              ? `${tag.color}80`  // Полупрозрачный фон для выбранного тега
              : 'transparent',
            transition: 'background-color 0.3s, box-shadow 0.3s', // Плавный переход
          }}
          onClick={() => onToggleAdd(tag.name)}
        >
          {tag.name}
        </Button>
      ))}
    </TagsContainer>
  );
};

export default Tags;