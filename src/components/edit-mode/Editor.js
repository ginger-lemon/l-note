import React, { useEffect, useRef, useState } from "react";
import { useNoteData } from "../../Hooks/NoteContext";
import showPWDIcon from "../../img/show-PWD-icon.svg";
import unshowPWDIcon from "../../img/unshow-PWD-icon.svg";

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
    const titleInputRef= useRef();
    const authorInputRef = useRef();
    const textsInputRef = useRef();
    const passwordInputRef = useRef();

    // 發佈時沒有取得密碼就 focus 對話框   
    useEffect(() => {
        passwordInputRef.current.focus();

        return () => {
            setIsFocusPasswordInput(false);
        }
    }, [isFocusPasswordInput === true]) 
    
    // 處理 textArea 自動長高與縮短
    useEffect(() => {
        resizeTitleTextArea();
    }, [noteTitle]);

    useEffect(() => {
        resizeTextsTextArea();
    }, [noteTexts]);

    function resizeTitleTextArea() {
        titleInputRef.current.style.height = "auto";
        titleInputRef.current.style.height = titleInputRef.current.scrollHeight + "px";
    }

    function resizeTextsTextArea() {
        textsInputRef.current.style.height = "auto";
        textsInputRef.current.style.height = textsInputRef.current.scrollHeight + "px";
    }


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
                defaultValue={noteTitle}
                onChange={handleChangeTitle}
                >
            </textarea>
            <input 
                text="text" 
                className="author" 
                placeholder="Author"
                ref={authorInputRef}
                defaultValue={noteAuthor}
                onChange={handleChangeAuthor}
            >
            </input>
            <textarea 
                className="textarea"
                type="textarea" 
                placeholder="Your content."
                rows={15}
                ref={textsInputRef}
                defaultValue={noteTexts}
                onChange={handleChangeTexts}
            >
            </textarea>
            <div>
                <label>
                    { noteTimeStamp === 11111 ? 
                        "*Set password for this note: " : 
                        "*Please enter the password again: " 
                    }
                </label>
                <input
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
                <label>Check password: </label><span>{passwordMessage}</span>

            </div>
    </form>
    );
}
