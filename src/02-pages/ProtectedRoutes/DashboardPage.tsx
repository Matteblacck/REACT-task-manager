import styled from "styled-components"
const DashboardContainer = styled.div`
    height: 100vh;
    padding-left: 40px;
    padding-right: 40px;
`
const SectionTitle = styled.h1`
    font-size: 23px;
`
const UsersWorkspaces = styled.div`
`
const SomeInfoContainer1 = styled.div`
`
const SomeInfoContainer2 = styled.div`
`
export default function DashboardPage(){
    return(
        <>
        <DashboardContainer className="d-flex row">
            <UsersWorkspaces className="col-4">
                <SectionTitle>Your workspaces</SectionTitle>
                <div>
                    <div>Workspace 1</div>
                    <div>Workspace 2</div>
                    <div>Workspace 3</div>
                </div>
            </UsersWorkspaces>
            <SomeInfoContainer1 className="col-4">
                <SectionTitle>content</SectionTitle>
                <div>
                    <div>Some info 1</div>
                    <div>Some info 2</div>
                    <div>Some info 3</div>
                </div>
            </SomeInfoContainer1>
            <SomeInfoContainer2 className="col-4">
                <SectionTitle>content</SectionTitle>
                <div>
                    <div>Some info 1</div>
                    <div>Some info 2</div>
                    <div>Some info 3</div>
                </div>
            </SomeInfoContainer2>

        </DashboardContainer>
        
        </>
    )
}