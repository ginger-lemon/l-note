import React, { useState, useRef } from "react";
import Dialog from "../dialog";
import { StyledDialogCustomDiv } from "../../styles/Styled.Dialog";
import showPWDIcon from "../../img/show-PWD-icon.svg";
import unshowPWDIcon from "../../img/unshow-PWD-icon.svg";
import { useNoteData } from "../../Hooks/NoteContext";
import { useNavigate } from "react-router-dom";

export default function VarifyDialog({ setShowVarifyDialog }) {
    const { 
        notePassword,
        inputPassword, setInputPassword,
    } = useNoteData();

    const [showPassword, setShowPassword] = useState(false);
    // const [inputPassword, setInputPassword] = useState();
    const inputRef = useRef();

    const navigate = useNavigate();
   
    function handleInputPassword(e) {
        const inputValue = inputRef.current.value;
        setInputPassword(inputValue);
    }

    function checkPassword() {
        // 取得密碼的資料
        console.log('只抓 password')

        if (inputPassword !== notePassword) {
            alert('Password error!');
            setShowPassword(false);
        } else {
            alert('Success!')
            navigate("/");
        }
    }
 
    // 關閉驗證對話框、比對密碼是否正確
    function closeVarifyDialog() {
        checkPassword();
        setShowVarifyDialog(false);
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
                    ref={inputRef}
                    onChange={handleInputPassword}
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