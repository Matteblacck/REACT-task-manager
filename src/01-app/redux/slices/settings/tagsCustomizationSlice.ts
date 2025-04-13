import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tag, tags as defaultTags } from "../../../../05-entities/boardInterfaces";

// Функция для обновления localStorage с сохранением тегов
const updateLocalStorage = (tags: Tag[]) => {
  const savedSettings = JSON.parse(localStorage.getItem('settings') || '{}');
  localStorage.setItem('settings', JSON.stringify({ ...savedSettings, tags }));
};

// Инициализация из localStorage
const getInitialTags = (): Tag[] => {
  const saved = localStorage.getItem("settings");
  const parsed = saved ? JSON.parse(saved) : {};
  return parsed.tags || defaultTags; // если ничего нет — дефолтные
};

const initialState: { tags: Tag[] } = {
  tags: getInitialTags(),
};

const tagsCustomizationSlice = createSlice({
  name: "tagsCustomization",
  initialState,
  reducers: {
    addTag: (state, action: PayloadAction<Tag>) => {
      state.tags.push(action.payload);
      updateLocalStorage(state.tags);
    },
    deleteTag: (state, action: PayloadAction<string>) => {
      state.tags = state.tags.filter((tag) => tag.name !== action.payload);
      updateLocalStorage(state.tags);
    },
    setTags: (state, action: PayloadAction<Tag[]>) => {
      state.tags = action.payload;
      updateLocalStorage(action.payload);
    },
  },
});

export const { addTag, deleteTag, setTags } = tagsCustomizationSlice.actions;
export default tagsCustomizationSlice.reducer;