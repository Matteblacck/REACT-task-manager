import styled from 'styled-components'
import { useSelector } from'react-redux';
import Authorised from './Authorised';
import Unauthorised from './Unauthorised';


export const HeaderContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 15px 30px;
  border-bottom: 1px solid #b4b2b2;

`;

export default function Header(){
    const isAuthentificated = useSelector((state: { auth: { isAuthenticated: boolean } }) => state.auth.isAuthenticated)
    return(
        <>
        {isAuthentificated ? 
        (
        <Authorised/>
        ) :
        (
        <Unauthorised/>
        )     
        }
        
        </>
        
    )
}