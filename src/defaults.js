import styled, {keyframes} from "styled-components";

export const Wrapper = styled.div`
    width:100%; 
    height:100%;
    min-height:100vh;
    display:flex;
    flex-direction: ${props => props.row ? 'row' : 'column'};
    position:relative;
    background-color:#2e2e2e;
`;

export const Gif = styled.img`
    margin:50px auto;
    width: 400px;
    height: 300px;
`;

export const Buttons = styled.div`
    margin:0 auto;
    width:400px;
    display:flex;
    justify-content:space-between;
    padding:15px;
`;

export const Button = styled.button`
    width: ${props => props.width ? props.width : '170px'};;
    height: ${props => props.height ? props.height : '50px'};
    font-size: ${props => props.font ? props.font : '24px'};
    color:  ${props => props.color ? props.color : '#57cab0'};
    margin: 0 7px;
    background-color: #2e2e2e;
    text-align:center;
    border: ${props => props.small ? '1px solid pink' : '1.5px solid #57cab0'};
    font-family: 'Lato', sans-serif;    
    text-transform:uppercase;
    font-weight:400;
    transition: all .3s;
    letter-spacing:1px;
    
    &:hover{
        background-color:${props => props.color ? props.color : '#57cab0'};
        box-shadow: ${props => props.small ? '1px 1px 10px pink' : '1px 1px 25px #57cab0'};
        color:#2e2e2e;
    }
`;

export const Title = styled.h3`
   color:${props => props.color ? props.color : '#57cab0'};
   font-family: 'Lato', sans-serif;   
   font-weight:400;
   padding: ${props => props.small ? '0' : '7px'}; 
   font-size: ${props => props.small ? '18px' : '24px'};
`;

const breatheAnimation = keyframes`
 0% {box-shadow:1px 1px 25px #57cab0;}
 50% {box-shadow:1px 1px 15px #57cab0;}    
 100% {box-shadow:1px 1px 25px #57cab0;}
`;


export const InputWrapper = styled.div`
    display:flex;
    justify-content:space-between;
    flex-direction:column;
    
    padding:15px 0;
    
    & label{ 
        color:#57cab0; 
        font-family: 'Lato', sans-serif; 
        text-transform:uppercase;
        font-size:18px;
        padding:0 7px 16px;
    }
    
    & input{
        border-radius:2px;
        border:1px solid #57cab0;
        box-shadow:1px 1px 25px #57cab0;    
        padding:7px;
        margin: 0 7px;
        color: #2e2e2e;
        font-family: 'Lato', sans-serif; 
        font-size:16px;
        animation-name: ${breatheAnimation};
        animation-duration: 2s;
        animation-iteration-count: infinite;
    }
`;