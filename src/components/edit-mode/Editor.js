import React, { useEffect, useRef, useState } from "react";
import { useNoteData } from "../../Hooks/NoteContext";
import showPWDIcon from "../../img/show-PWD-icon.svg";
import unshowPWDIcon from "../../img/unshow-PWD-icon.svg";
import useAutoResizeTextatea from "../../Hooks/useAutoResizeTextarea";

export default function Editor({ handlePublish }) {
    const { 
        noteTitle, setNoteTitle,
        noteAuthor, setNoteAuthor, 
        noteTexts, setNoteTexts,
        notePassword, setNotePassword,
        noteTimeStamp,
        isFocusPasswordInput, setIsFocusPasswordInput,
    } = useNoteData();

    const [showPassword, setShowPassword] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState("Please set password for this note.");
    const titleInputRef= useAutoResizeTextatea(noteTitle);
    const authorInputRef = useRef();
    const textsInputRef = useAutoResizeTextatea(noteTexts);
    const passwordInputRef = useRef();

    // 發佈時沒有取得密碼就 focus 對話框   
    useEffect(() => {
        passwordInputRef.current.focus();

        return () => {
            setIsFocusPasswordInput(false);
        }
    }, [isFocusPasswordInput === true]) 

    // ＝＝＝＝＝ 處理密碼設定問題 ＝＝＝＝＝
    function handleSetPassword() {
        const passwordInputValue = passwordInputRef.current.value; 

        if (!/^[a-zA-Z0-9]+$/.test(passwordInputValue)) {
            // console.log(passwordInputRef.current.value);
            setPasswordMessage('Number and English letters only');
            
        } else if (passwordInputValue.length >=6 && passwordInputValue.length <=12) {
            setNotePassword(passwordInputValue);
            setPasswordMessage("Password done.");

        } else if (passwordInputValue.length > 12) {

        } else {
            setNotePassword(passwordInputValue);
            setPasswordMessage("Password should be 6-12 characters.");
        }
    }

    // ＝＝＝＝＝ 按眼睛 svg 切換是否顯示密碼 ＝＝＝＝＝
    function handleShowPassword() {
        setShowPassword(!showPassword);
    }
    
    // ＝＝＝＝＝ input 事件處理函數 ＝＝＝＝＝
    function handleChangeTitle(e) {
        setNoteTitle(e.target.value);
    }

    function handleChangeAuthor(e) {
        setNoteAuthor(e.target.value);
    }

    function handleChangeTexts(e) {
        setNoteTexts(e.target.value);
    }

    return (
        <form
            id="editForm" 
            onSubmit={handlePublish}
        >
            <textarea 
                type="textarea" 
                className="title" 
                placeholder="Title"
                rows={1}
                ref={titleInputRef}
                value={noteTitle}
                onChange={handleChangeTitle}
                >
            </textarea>
            <input 
                text="text" 
                className="author" 
                placeholder="Author"
                ref={authorInputRef}
                value={noteAuthor}
                onChange={handleChangeAuthor}
            >
            </input>
            <textarea 
                className="textarea"
                type="textarea" 
                placeholder="Your note. Available for easy markdown type."
                rows={15}
                ref={textsInputRef}
                value={noteTexts}
                onChange={handleChangeTexts}
            >
            </textarea>
            <div>
                <label htmlFor="passwordInput">
                    { noteTimeStamp === 11111 ? 
                        "*Set password for this note: " : 
                        "*Please enter the password again: " 
                    }
                </label>
                <input
                    id="passwordInput"
                    className="input-password"
                    style={{width: "300px"}}
                    type={showPassword ? 'text' : 'password'}
                    ref={passwordInputRef}
                    placeholder="6-12 letters and numbers"
                    onChange={handleSetPassword}
                    maxLength={12}
                >
                </input>
                <img 
                    src={showPassword ? showPWDIcon : unshowPWDIcon}
                    height="30px"
                    onClick={handleShowPassword}
                />
                <br />
                <span>Password hint: </span><span className="password-hint">{passwordMessage}</span>
            </div>
    </form>
    );
}
