import { useState } from "react";

export const useTags = () => {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const handleTagSelection = (tag: string) => {
        setSelectedTags((prevSelectedTags) => {
          // Если тег уже выбран, то удаляем его из списка
          if (prevSelectedTags.includes(tag)) {
            return prevSelectedTags.filter((t) => t !== tag);
          }
          // Если тег не выбран, добавляем его в список выбранных
          return [...prevSelectedTags, tag];
        });
      };
    return{
        selectedTags,
        handleTagSelection
    }
}