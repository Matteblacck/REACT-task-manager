import { useDispatch } from 'react-redux';
import { Tag } from '../../05-entities/boardInterfaces'; // Правильный импорт типа Tag
import { addTag, deleteTag } from '../../01-app/redux/slices/settings/tagsCustomizationSlice';
import { AppDispatch } from '../../01-app/redux/store';

export const UseManageTags = () => {
    const dispatch = useDispatch<AppDispatch>();
    
    const handleAddTag = (tag: Tag) => {
        dispatch(addTag(tag));
        
    };
    
    const handleDeleteTag = (tagName: string) => {
        dispatch(deleteTag(tagName));
    };
    
    return { handleAddTag, handleDeleteTag };
};