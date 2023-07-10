import React from "react";
import { StyledButton } from "../styles/Styled-Button";

export default function Button({ btnName }) {
    return (
        <StyledButton>
            {btnName}
        </StyledButton>
    );
}