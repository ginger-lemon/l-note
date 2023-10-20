import React from "react";
import Button from "../button/Button";
import { StyledDialog, StyledDialogChildren } from "./StyledDialog";

const Dialog = ({
     title, describe, children,
     buttonName, buttonType, handleClick 
    
    }) => {
    return (
        <StyledDialog>
            <h2>{title}</h2>
            <p>{describe}</p>
            <StyledDialogChildren>
                {children}
            </StyledDialogChildren>
            <div>
                <Button 
                    buttonName={buttonName}
                    buttonType={buttonType}
                    handleClick={handleClick}
                />
            </div>
        </StyledDialog>
    )
}

export default Dialog