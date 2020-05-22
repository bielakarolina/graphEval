import React from "react";
import styled from "styled-components";
import {Button} from "../defaults";


const ButtonSmall = styled(Button)`
 padding:5px 10px;
 margin:2px;
`;

export const OptionButton = (props) => {
    return <ButtonSmall small width="auto" font="14px" height="auto" color='pink' onClick={props.click}>{props.name}</ButtonSmall>;
}
