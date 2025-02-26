import styled from "styled-components"
const StyledInput = styled.input`
    background-color: ${(props) => props.theme.inputBackground};
    border: 1px solid gray;
    border-radius: 5px;
    height: 35px;
    padding: 8px 12px;
    width:100%;
    outline: none; /* Убираем стандартное выделение */
    caret-color: gray;
    color:black;
    
`
export default function Input( props: React.InputHTMLAttributes<HTMLInputElement> ) {
    return (
        <StyledInput {...props} />
    )
}