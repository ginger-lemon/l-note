import React, { forwardRef, useEffect, useRef, useState } from "react";
import Dialog from "./dialog";
import { StyledDialogCustomDiv } from "../styles/Styled.Dialog";
import showPWDIcon from "../img/show-PWD-icon.svg";
import unshowPWDIcon from "../img/unshow-PWD-icon.svg";
import { useNoteData } from "../Hooks/NoteContext";


const VarifyPasswordDialog = forwardRef(function VarifyPasswordDialog( props , ref ) {
    const { 
        showVarifyDialog, setShowVarifyDialog,
        inputPassword, setInputPassword,
        inputError, setInputError,
        inputErrorMessage, setInputErrorMessage
    } = useNoteData();

    const { doneButtonMission } = props;
    const inputRef = useRef();
    const [showPassword, setShowPassword] = useState(false);

    // ＝＝＝＝＝ 輸入密碼時直接確認密碼是否符合格式 ＝＝＝＝＝
    function handleCheckPasswordType() {

        const inputValue = inputRef.current.value;

        if (!/^[a-zA-Z0-9]+$/.test(inputValue)) {

            console.log(inputRef.current.value);
            setInputError(true);
            setInputErrorMessage('Number and English letters only');

        } else if (inputValue.length >= 12 || inputValue.length <= 6) {
            
            console.log('密碼未滿足格式，繼續編輯或刪減');
            setInputError(true);
            setInputErrorMessage('Password should be 6-12 characters.');

         } else {
            
            console.log('密碼符合規則');
            setInputError(false);
            setInputPassword(inputValue);
            console.log('inputPassword: ', inputPassword);
            
        }
    }

    function handleShowPassword() {
        setShowPassword(!showPassword);
    }

    return (
        <div ref={ref}>
            <Dialog
                id="dialog-container"
                dialogTitle="Enter the password for this note"
                dialogDescribe={ inputError && inputErrorMessage }
                doneButtonMission={doneButtonMission}
            >
                <StyledDialogCustomDiv>
                    <input
                        style={{ width: "250px" }}
                        type={showPassword ? 'text' : 'password'}
                        ref={inputRef}
                        onChange={handleCheckPasswordType}
                    >
                    </input>
                    <img 
                        height="48px"
                        src={ showPassword ? showPWDIcon : unshowPWDIcon }
                        onClick={handleShowPassword}
                    />
                </StyledDialogCustomDiv>
            </Dialog>
        </div>
    );
});

export default VarifyPasswordDialog;
