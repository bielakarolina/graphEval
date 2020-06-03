import React from "react";
import styled from "styled-components";
import {Title, Button, InputWrapper} from '../defaults'

const Wrapper = styled.div`
  width:400px;
  margin: 0 auto;
  padding:15px;
`;

export const Form = (props) => {
    return (
        <Wrapper>
           <Title>{props.name}</Title>
            {props.fields.map((field,index) => {
                return(
                    <InputWrapper key={index}>
                        <label htmlFor={field.name}>{field.label}</label>
                        <input required={true} type={field.type} name={field.name} onChange={field.change} value={field.value}/>
                    </InputWrapper>
                )
            })}
            <Button width='120px' height='35px' font='18px' onClick={props.click}>Submit</Button>
        </Wrapper>
    );
}
