import React, { useRef, useEffect } from "react";
import Button from "../components/button.js";
import { StyledAsideContainer, StyledMainContainer } from "../styles/Styled-Main-Aside.js";
import { StyledArticle } from "../styles/Styled-Article.js";
import { useNoteData } from "../Hooks/NoteContext.js";
import Editor from "../components/edit-mode/Editor.js";
import { useNavigate } from "react-router-dom";
import { deleteNoteOnDatabase, setNoteToDatabase, updateNoteToDatabase, getPasswordFromDatabase } from "../library/fetchToFirestore.js";
import VarifyPasswordDialog from "../components/VarifyPasswordDialog.js";
import { SHA256 } from "crypto-js";
import EnsureDeleteAlert from "../components/edit-mode/EnsureDeleteAlert.js";
  
export default function EditMode() {
    const { 
        noteTitle, 
        noteAuthor, 
        noteTexts,
        noteID, 
        notePassword,
        setNoteID, 
        setNoteDate, 
        noteTimeStamp, setNoteTimeStamp,
        
        inputPassword, 
        showDeleteAlert, setShowDeleteAlert,
        showVarifyDialog, setShowVarifyDialog,
        setInputError,
        setInputErrorMessage,
        setIsFocusPasswordInput
    } = useNoteData();

    const navigate = useNavigate();
    const dialogWrapRef = useRef();

     // ＝＝＝＝＝ click outside to close dialog ＝＝＝＝＝
     useEffect(() => {
        function clickOutsideToCloseDialog(e) {
            if (dialogWrapRef.current && !dialogWrapRef.current.contains(e.target)) {
                setShowVarifyDialog(false);
            } else {
                return;
            }
        }
        document.addEventListener('click', clickOutsideToCloseDialog)

        return () => {
            document.removeEventListener('click', clickOutsideToCloseDialog);
        }
    }, [showDeleteAlert])

    // ＝＝＝＝＝ 處理刪除資料 ＝＝＝＝＝
    // 按下刪除鍵 -> 跳出視窗選擇是否刪除資料 -> 是 -> 進入密碼驗證 -> 刪除資料並清除 local storage 資料
    // 按下刪除鍵 -> 跳出視窗選擇是否刪除資料 -> 否 -> 關閉對話框回到編輯頁面
    function handleClickDeleteButton() {
        setShowDeleteAlert(true);
    }

    // ＝＝＝＝＝ 處理按下驗證對話框的按鈕後執行驗證與刪除 note ＝＝＝＝＝
    // 輸入密碼後需要驗證，沒問題送出刪除請求
    async function varifyDoneButtonMisson() { 

        const correctPassword = await getPasswordFromDatabase(noteID);
        const encryptedInputPassword = SHA256(inputPassword).toString();
        
        if (encryptedInputPassword === correctPassword) {
            deleteNoteOnDatabase(noteID);
        } else {
            setInputError(true);
            setInputErrorMessage('Password is uncorrect');
            return;
        }

        clearLoccalStorage();
    }

    // 清除 local Storage 
    function clearLoccalStorage() {
        localStorage.removeItem("title");
        localStorage.removeItem("texts");
        localStorage.removeItem("author");
        localStorage.removeItem("timeStamp");
        localStorage.removeItem("id");

        history.go(0);
    }

    // ＝＝＝＝＝ 處理發佈 note ＝＝＝＝＝
    function handlePublish (e) {
        e.preventDefault();

        if (notePassword === '') {
            alert("Please set the password for this note in the password filed.");
            setIsFocusPasswordInput(true);
            return;
        } 

        if (noteTimeStamp === 11111) {
            let noteDate, noteTimeStamp, noteID, noteUID;
            const encryptedPassword = SHA256(notePassword).toString();

            noteDate = getPublishedDate();
            noteTimeStamp = getTimeStamp();

            noteUID = generateNoteID(noteTitle, noteDate);
            noteID = noteUID;

            // setDoc
            setNoteToDatabase(noteUID, {
                noteTitle, 
                noteAuthor,
                noteDate,
                noteTexts,
                encryptedPassword,
                noteTimeStamp,
                noteID,
            });

            // 賦值
            setNoteDate(noteDate);
            setNoteTimeStamp(noteTimeStamp);
            setNoteID(noteID);

            // console.log('測試發送資料時 noteUID 有被值' ,noteUID);
            navigate(`/${noteID}`);   

        } else {
            const encryptedPassword = SHA256(notePassword).toString();
            let noteUID = noteID;

            // 使用 update 更新資料
            updateNoteToDatabase(noteUID, {
                noteTitle, 
                noteAuthor,
                noteTexts,
                encryptedPassword,
            });

            navigate(`/${noteID}`); 
        }  
    }

    // 產生 url 動態網址部分
    function generateNoteID(title, date) {
        const id = title.replace(/\s/g, "-") + "-" + date;
        return id;
    }
    
    // 取得發佈時間戳記
    function getTimeStamp() {
        const time = new Date();
        const timeStamp = time.getTime();
        return timeStamp;
    }
        
    // 取得發佈時間（年月日）
    function getPublishedDate() {
        const newDate = new Date();
        const date = newDate.getDate();
        const month = newDate.getMonth() + 1;
        const year = newDate.getFullYear();
        const publishDate = year + "-" + month + "-" + date;
        return publishDate;
    }
    
    return (
        <StyledMainContainer>
            <StyledArticle>
                <Editor 
                    handlePublish={handlePublish}
                />
            </StyledArticle>
            <StyledAsideContainer>
                <Button 
                    type="submit"
                    form="noteForm"
                    btnName="Publish"
                    onClick={handlePublish}
                />
                <Button 
                    type="submit"
                    form="noteForm"
                    btnName="Reset"
                    onClick={clearLoccalStorage}
                />
                { noteTimeStamp !== 11111 ? (
                    <Button 
                        type="submit"
                        form="noteForm"
                        btnName="Delete"
                        onClick={handleClickDeleteButton}
                    />
                    ) : null } 
            </StyledAsideContainer>
                { showVarifyDialog && (
                    <VarifyPasswordDialog
                        ref={dialogWrapRef} 
                        doneButtonMission={varifyDoneButtonMisson}
                    />
                )}
                { showDeleteAlert && (
                    <EnsureDeleteAlert />
                ) }
        </StyledMainContainer>
    ); 
}
