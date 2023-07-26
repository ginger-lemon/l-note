import React, { useState } from "react";
import Button from "../components/button.js";
import { StyledAsideContainer, StyledMainContainer } from "../styles/Styled-Main-Aside.js";
import { StyledArticle } from "../styles/Styled-Article.js";
import { useNoteData } from "../Hooks/NoteContext.js";
import Editor from "../components/edit-mode/Editor.js";
import { useNavigate } from "react-router-dom";
import { deleteNoteOnDatabase, setNoteToDatabase, updateNoteToDatabase, getPasswordFromDatabase } from "../library/fetchToFirestore.js";
import VarifyPasswordDialog from "../components/VarifyPasswordDialog.js";

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
    } = useNoteData();

    // 切換頁面網址
    const navigate = useNavigate();

    

    // 處理刪除資料
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

    // 輸入密碼後需要驗證，沒問題送出刪除請求
    async function varifyDoneButtonMisson() { 
        console.log('開始驗證密碼');
        console.log('input password: ', inputPassword);
        console.log('noteID: ', noteID);

        const correctPassword = await getPassword(noteID);
        console.log('correctPassword: ', correctPassword);
        
        if (inputPassword === correctPassword) {
            console.log('run compare password');
            deleteNoteOnDatabase(noteID);
            clearLoccalStorage();
        } else {
            return;
        }
        
        // get password
        async function getPassword(noteID) {
            try {
                console.log('enter try');
                const data = await getPasswordFromDatabase(noteID);
                console.log('從資料庫 get 的 password: ');
                console.log(data);
                return data;
            } catch (error) {
                console.log('Password getting failed.');
                alert('Password is uncorrect.');
                setShowVarifyDialog(false);
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

    // 產生 url 動態網址部分
    function generateNoteID(title, date) {
        const id = title.replace(/\s/g, "-") + "-" + date;
        return id;
    }

    // 處理發佈 note 
    function handlePublish (e) {
        e.preventDefault();

        if (notePassword === '') {
            alert("Please set the password for this note in the password filed.");
            return;
        } 

        // 如果 timestamp === undefined => 資料庫無資料， set
        // 如果 timestamp !== undefined => 曾經發送資料， update
        if (noteTimeStamp === 11111) {
            let noteDate, noteTimeStamp, noteID, noteUID;

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
                notePassword,
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
            let noteUID = noteID;
            console.log('使用 update 更新資料，不能更新到 title');
            // 使用 update 更新資料
            updateNoteToDatabase(noteUID, {
                noteTitle, 
                noteAuthor,
                noteTexts,
                availableDays,
                notePassword,
            });

            navigate(`/${noteID}`); 
        }   
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
