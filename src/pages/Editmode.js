import React, { useState } from "react";
import Button from "../components/button.js";
import { StyledAsideContainer, StyledMainContainer } from "../styles/Styled-Main-Aside.js";
import { StyledArticle } from "../styles/Styled-Article.js";
import { useNoteData } from "../Hooks/NoteContext.js";
import Editor from "../components/edit-mode/Editor.js";
import { useNavigate } from "react-router-dom";
import { deleteNoteOnDatabase, setNoteToDatabase, updateNoteToDatabase} from "../library/fetchToFirestore.js";
import VarifyDialog from "../components/note-mode/EditVarifyDialog.js";

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

        showVarifyDialog, setShowVarifyDialog,
    } = useNoteData();

    // 切換頁面網址
    const navigate = useNavigate();

    // 清除 local Storage 
    function clearLoccalStorage() {
        localStorage.removeItem("title");
        localStorage.removeItem("texts");
        localStorage.removeItem("author");
        localStorage.removeItem("timeStamp");
        localStorage.removeItem("id");
        // 重新整理頁面
        history.go(0);

    }

    // 處理刪除資料
    function handleDeleteNote() {
        console.log('要開始刪除資料了');
        console.log('輸入密碼才能刪除，要呼叫 EditVarifyDialog ');
        console.log('notePassword: ', notePassword);

        if (notePassword === '') {
            alert('Please input the password for this note in the password filed.');
            return;
        }
        
        // confirm('Would you really want to delete this note?');
        if (confirm('Would you really want to delete this note?') == false) {
            console.log('取消刪除');
            
        } else {
            // setShowVarifyDialog(true);
            // 解決 run deleteDoc 會先出現的問題
            console.log('run deleteDoc');
            deleteNoteOnDatabase(noteID);
            // 刪除時清空 local storage 
            clearLoccalStorage();
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
                        onClick={handleDeleteNote}
                    />
                    ) : null } 
                
            </StyledAsideContainer>
                { showVarifyDialog && (
                    <VarifyDialog 
                        setShowVarifyDialog={setShowVarifyDialog}
                    />
                )}
                
        </StyledMainContainer>
    ); 
}
