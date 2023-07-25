import React, { useRef, useState } from "react";
import { useNoteData } from "../../Hooks/NoteContext";
import showPWDIcon from "../../img/show-PWD-icon.svg";
import unshowPWDIcon from "../../img/unshow-PWD-icon.svg";


export default function Editor({ handleShowDeleteDialog, handleShowSetPasswordDialog, handlePublish }) {
    const { 
        noteTitle, setNoteTitle,
        noteAuthor, setNoteAuthor, 
        noteTexts, setNoteTexts,
        notePassword, setNotePassword,
        noteTimeStamp,
    } = useNoteData();

    const [showPassword, setShowPassword] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState("Please set password for re-editing later.");
    const passwordInputRef = useRef();

    function handleShowPassword() {
        setShowPassword(!showPassword);
    }

    // 處理密碼設定問題
    function handleSetPassword() {
        const passwordInputValue = passwordInputRef.current.value;

        if (!/^[a-zA-Z0-9]+$/.test(passwordInputValue)) {
            console.log(passwordInputRef.current.value);
            setPasswordMessage('Number and English letters only');
            
        } else if (passwordInputValue.length >=6 && passwordInputValue.length <=12) {
            setNotePassword(passwordInputValue);
            setPasswordMessage("Password done.");

        } else {
            setNotePassword(passwordInputValue);
            setPasswordMessage("Password should be 6-12 characters.");
        }

    }

    return (
        <form
            id="editForm" 
            onSubmit={handlePublish}
        >
                <input 
                style={{ width:"700px" }}
                text="text" 
                className="header" 
                placeholder="Title"
                onChange={(e) => {
                    setNoteTitle(e.target.value);
                }}
                required
                defaultValue={noteTitle}
                >
                </input>
            <input 
                text="text" 
                className="author" 
                placeholder="Author"
                onChange={(e) => {
                    setNoteAuthor(e.target.value);
                }}
                defaultValue={noteAuthor}
            >
            </input>
            <textarea 
            // TODO: 要讓 textarea 的高度跟著文字數量自動增加
                className="textarea"
                type="textarea" 
                placeholder="Your content."
                onChange={(e) => {
                    setNoteTexts(e.target.value);
                }}
                defaultValue={noteTexts}
            >
            </textarea>
            <div>
                <label>
                    { noteTimeStamp === 11111 ? "*Set password for this note:" : "*Input/Reset password for this note" }
                </label>
                <input
                    className="input-password"
                    style={{width: "300px"}}
                    type={showPassword ? 'text' : 'password'}
                    ref={passwordInputRef}
                    placeholder="6-12 letters and numbers"
                    onChange={handleSetPassword}

                >
                </input>
                <img 
                    src={showPassword ? showPWDIcon : unshowPWDIcon}
                    height="30px"
                    onClick={handleShowPassword}
                />
                <br />
                <label>Check password: </label><span>{passwordMessage}</span>

            </div>
    </form>
    );
}
