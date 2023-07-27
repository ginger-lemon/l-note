import React, { useState } from "react";
import Button from "../components/button.js";
import { StyledAsideContainer, StyledMainContainer } from "../styles/Styled-Main-Aside.js";
import { StyledArticle } from "../styles/Styled-Article.js";
import { useNoteData } from "../Hooks/NoteContext.js";
import Editor from "../components/edit-mode/Editor.js";
import { useNavigate } from "react-router-dom";
import { deleteNoteOnDatabase, setNoteToDatabase, updateNoteToDatabase, getPasswordFromDatabase } from "../library/fetchToFirestore.js";
import VarifyPasswordDialog from "../components/VarifyPasswordDialog.js";
import { SHA256 } from "crypto-js";
  
export default function EditMode() {
    const { 
        noteTitle, 
        noteAuthor, 
        noteTexts,
        noteID, 
        notePassword,
        availableDays,
        setNoteID, 
        setNoteDate, 
        noteTimeStamp, setNoteTimeStamp,
        
        inputPassword, setInputPassword,
        showVarifyDialog, setShowVarifyDialog,
        inputError, setInputError,
        inputErrorMessage, setInputErrorMessage,
    } = useNoteData();
    const navigate = useNavigate();

    // ＝＝＝＝＝ 處理刪除資料 ＝＝＝＝＝
    // 按下刪除鍵 -> 跳出視窗選擇是否刪除資料 -> 是 -> 進入密碼驗證 -> 刪除資料並清除 local storage 資料
    // 按下刪除鍵 -> 跳出視窗選擇是否刪除資料 -> 否 -> 關閉對話框回到編輯頁面
    function handleClickDeleteButton() {
        if (confirm('Do you really want to delete this note?')) {
            setShowVarifyDialog(true);
        } else {
            setShowVarifyDialog(false);
            return;
        }
    }

    // ＝＝＝＝＝ 處理按下驗證對話框的按鈕後執行驗證與刪除 note ＝＝＝＝＝
    // 輸入密碼後需要驗證，沒問題送出刪除請求
    async function varifyDoneButtonMisson() { 
        console.log('開始驗證密碼');
        console.log('input password: ', inputPassword);
        console.log('noteID: ', noteID);

        const correctPassword = await getPasswordFromDatabase(noteID);
        const encryptedInputPassword = SHA256(inputPassword).toString();
        console.log('correctPassword: ', correctPassword);
        console.log('encryptedInputPassword: ', encryptedInputPassword)
        
        if (encryptedInputPassword === correctPassword) {
            console.log('encryptedInputPassword === correctPassword')
            deleteNoteOnDatabase(noteID);
            clearLoccalStorage();
        } else {
            setInputError(true);
            setInputErrorMessage('Password is uncorrect');
            return;
        }
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
            return;
        } 

        if (noteTimeStamp === 11111) {
            let noteDate, noteTimeStamp, noteID, noteUID;
            const encryptedPassword = SHA256(notePassword).toString();
            console.log(encryptedPassword);

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
                availableDays,
                encryptedPassword,
                noteTimeStamp,
                noteID,
            });

            // 賦值
            setNoteDate(noteDate);
            setNoteTimeStamp(noteTimeStamp);
            setNoteID(noteID);

            console.log('測試發送資料時 noteUID 有被值' ,noteUID);
            navigate(`/${noteID}`);   

        } else {
            const encryptedPassword = SHA256(notePassword).toString();
            let noteUID = noteID;
            console.log('使用 update 更新資料，不能更新到 title');

            // 使用 update 更新資料
            updateNoteToDatabase(noteUID, {
                noteTitle, 
                noteAuthor,
                noteTexts,
                availableDays,
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
                        doneButtonMission={varifyDoneButtonMisson}
                    />
                )}
        </StyledMainContainer>
    ); 
}
