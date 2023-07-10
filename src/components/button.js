import React from "react";
import { StyledButton } from "../styles/Styled-Button";

export default function Button({ btnName, onClick }) {
    return (
        <StyledButton onClick={onClick}>
            {btnName}
        </StyledButton>
    );
}