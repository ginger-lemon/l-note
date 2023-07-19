import React, { useState } from "react";
import Dialog from "../dialog";
import { StyledDialogCustomDiv } from "../../styles/Styled.Dialog";

export default function VarifyDialog({ setShowVarifyDialog }) {
    const [showPassword, setShowPassword] = useState(false);

    // 關閉驗證對話框
    function closeVarifyDialog() {
        setShowVarifyDialog(false)
    } 

    return (
        <Dialog
            dialogTitle="Please enter your password"
            dialogDescribe="Input your password"
            doneButtonMission={closeVarifyDialog}
        >
            <StyledDialogCustomDiv>
                <input
                    style={{ width: "250px" }}
                    type={showPassword ? 'text' : 'password'}
                >
                </input>
                <img 
                    height="48px"
                    src={ showPassword ? showPWDIcon : unshowPWDIcon }
                    onClick={() => setShowPassword(!showPassword)}
                />
            </StyledDialogCustomDiv>
        </Dialog>
    );
}