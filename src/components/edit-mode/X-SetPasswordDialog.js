import React, { useState, useRef } from "react";
import Dialog from "../dialog";
import { StyledDialogCustomDiv } from "../../styles/Styled.Dialog";
import showPWDIcon from "../../img/show-PWD-icon.svg";
import unshowPWDIcon from "../../img/unshow-PWD-icon.svg";
import { useNoteData } from "../../Hooks/NoteContext";

export default function PasswordDialog({ setShowSetPasswordDialog,  }) {
    const { notePassword, setNotePassword } = useNoteData();
    const [showPassword, setShowPassword] = useState(false);
    const inputRef = useRef();
    const [inputError, setInputError] = useState(false);
    const [inputErrorMessage, setInputErrorMessage] = useState('');

    // 將輸入的密碼儲存到 password 變數中
    function handleSetPassword() {
        const inputValue = inputRef.current.value;
        // 處理在輸入過程中輸入非英文與數字
        if (!/^[a-zA-Z0-9]+$/.test(inputValue)) {  
            setInputError(true);
            setInputErrorMessage("Number and English letters only");
            inputRef.current.value = '';
        }  else {
            setInputError(false);
            setNotePassword(inputValue);
        }
    }

    // 關閉刪除對話框（關閉前確認密碼是否符合格式，否則重新設定）
    function closeDeleteDialog() {
        setInputError(false);
        if ( notePassword.length >=6 && notePassword.length <=12 ) {
            setShowSetPasswordDialog(false);
        } else {
            setInputError(true);
            setInputErrorMessage("Password should be 6-12 characters.");
        }
    }
            

    return (
        <Dialog
            dialogTitle="Please input the password"
            dialogDescribe=""
            doneButtonMission={closeDeleteDialog}
        >
            <StyledDialogCustomDiv
                style = {{ margin: "10px 40px 0"}}
            >
                <input
                    style={{ width: "250px" }}
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    ref={inputRef}
                    onChange={handleSetPassword}
                >
                </input>
                <img 
                    height="48px"
                    src={ showPassword ? showPWDIcon : unshowPWDIcon }
                    onClick={() => setShowPassword(!showPassword)}
                />
                {inputError && (
                    <p style={{color: "red"}}>{inputErrorMessage}</p>
                )}
                
            </StyledDialogCustomDiv>
        </Dialog>

    );
}

