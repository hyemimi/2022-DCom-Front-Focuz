import styled from "styled-components";

export const Box = styled.div`
width: ${props => props.width};
height: ${props => props.height};
background-color: rgb(230,230,230);
border-radius: 20px;
display: flex;
flex-direction: column;
align-items: center;
padding: 20px;
justify-content: space-between;
margin: 10px;
*{
    color: rgb(39, 39, 39);
    font-weight: bold;
}
button{
    color: rgb(230,230,230);
}
`