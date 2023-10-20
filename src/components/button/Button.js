import React from "react";
import { StyledButton } from './StyledButton'


const Button = ({ buttonType, handleClick, buttonName }) => {
    return (
        <StyledButton
            type={buttonType}
            onClick={handleClick}

        >
            {buttonName}
        </StyledButton>
    )
}

export default Button