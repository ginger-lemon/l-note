import React, { Children } from "react";
import Button from "./button";
import { StyledDialog, StyledDialogCustomDiv } from "../styles/Styled.Dialog";


const styledDoneButton = {
    margin: "0 auto 25px",
    width: "fit-content"
}

export default function Dialog({ children, dialogTitle, dialogDescribe }) {
    return (
        <StyledDialog>
            <h2>{dialogTitle}</h2>
            <p>{dialogDescribe}</p>
            <StyledDialogCustomDiv>
                {children}
            </StyledDialogCustomDiv>
            <DialogDoneButton />
        </StyledDialog>
    );
}

function DialogDoneButton() {
    return (
        <div
            style={ styledDoneButton }
        >
                <Button 
                    btnName="Done"
                    onClick={() => console.log('確認')}
                /> 
        </div>
    );
}
