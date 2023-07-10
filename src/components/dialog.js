import React, { Children } from "react";
import Button from "./button";
import { StyledDialog } from "../styles/Styled.Dialog";

export default function Dialog({ children, dialogTitle }) {
    return (
        <StyledDialog>
            <h2>
                {dialogTitle}
            </h2>
            {children}
            <div style={{ margin: "0 auto 25px", width: "fit-content"}}>
                <Button 
                    btnName="Done"
                    onClick={() => console.log('確認')}
                >           
                </Button>
            </div>
        </StyledDialog>
    );
}