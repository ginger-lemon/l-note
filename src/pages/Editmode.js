import React, { useState } from "react";
import Button from "../components/button.js";
import { StyledAsideContainer, StyledMainContainer } from "../styles/Styled-mainStrucutre.js";
import { StyledArticle } from "../styles/Styled-edit-note.js";
import { useNoteData } from "../Hooks/NoteContext.js";
import DeleteDialog from "../components/edit-mode/DeleteDialog.js";
import Editor from "../components/edit-mode/Editor.js";
import { useNavigate } from "react-router-dom";
import { setNoteToDatabase, updateNoteToDatabase} from "../library/fetchToFirestore.js";
import SetPasswordDialog from "../components/edit-mode/SetPasswordDialog.js";

export default function EditMode() {
    const { 
        noteTitle, noteAuthor, noteTexts, notePassword,
        availableDays, setAvailableDays,
        setNoteID, setNoteDate,
        noteTimeStamp, setNoteTimeStamp,
    } = useNoteData();

    // 管理對話框的動態
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showSetPasswordDialog, setShowSetPasswordDialog] = useState(false);

    // 切換頁面網址
    const navigate = useNavigate();

    // 處理顯示設定密碼的對話框
    function handleShowSetPasswordDialog(e) {
        if (e.target.checked !== false) {
            setShowSetPasswordDialog(true);
        } else {
            setShowSetPasswordDialog(false);
        }
    }

    // 處理顯示設定刪除時間的對話框
    function handleShowDeleteDialog(e) {
        if (e.target.checked !== false) {
            setShowDeleteDialog(true);
            setAvailableDays(7);
            console.log(availableDays);
        } else {
            setShowDeleteDialog(false);
            setAvailableDays(Infinity);
            console.log(availableDays);
        }
    } 

    function toggleToNoteMode(noteID) {
        console.log('切換到 NoteMode ');
        console.log('noteID: ', noteID)
        // testNote 之後會切換成 noteID 
        navigate(`/${noteID}`);   
        console.log('好像切換的部分有問題＠＠但之前都沒問題ㄉ說⋯⋯')
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

    function generateNoteID(title, date) {
        const id = 
        title.replace(/\s/g, "-") + "-" + date;
        return id;
    }

    // 如果 timestamp === undefined => 資料庫無資料， set
    // 如果 timestamp !== undefined => 曾經發送資料， update
    function handlePublish (e) {
        e.preventDefault();
        let noteDate, noteTimeStamp, noteID, noteUID;
       
        // 處理資料新增/更新
        if (noteTimeStamp === undefined) {
            noteDate = getPublishedDate();
            noteTimeStamp = getTimeStamp();

            console.log('noteDate: ' , noteDate);
            console.log('noteTimeStamp: ', noteTimeStamp);

            noteUID =  generateNoteID(noteTitle, noteDate);
            noteID = noteUID;

            console.log('在送出按鈕內的 noteUID: ', noteUID);
            console.log('在送出按鈕內的 noteID: ', noteID)
            console.log('availableDays: ', availableDays);

            // 使用 set 新增資料
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

            console.log('測試發送資料時 noteUID 有被值' ,noteUID)

            setNoteDate(noteDate);
            setNoteTimeStamp(noteTimeStamp);
            setNoteID(noteID);
            
            // 切換到 NoteMode
            navigate(`/${noteID}`);   
            // toggleToNoteMode(noteUID);

        } else {
            console.log('使用 update 更新資料，不能更新到 title');
            // 使用 update 更新資料
            updateNoteToDatabase(noteID, {
                noteTitle, 
                noteAuthor,
                noteTexts,
                availableDays,
                notePassword,
            });

            toggleToNoteMode();
        }        
    }
    
    return (
        <StyledMainContainer>
            <StyledArticle>
                <Editor 
                    handlePublish={handlePublish}
                    handleShowDeleteDialog={handleShowDeleteDialog}
                    handleShowSetPasswordDialog={handleShowSetPasswordDialog}
                />
            </StyledArticle>
            <StyledAsideContainer>
                <Button 
                    type="submit"
                    form="noteForm"
                    btnName="Publish"
                    onClick={handlePublish}
                />
            </StyledAsideContainer>
                { showDeleteDialog && (
                    <DeleteDialog 
                        setShowDeleteDialog={setShowDeleteDialog}
                    /> 
                )}
                { showSetPasswordDialog && (
                    <SetPasswordDialog 
                        showSetPasswordDialog={showSetPasswordDialog}
                        setShowSetPasswordDialog={setShowSetPasswordDialog}
                />
                ) }
        </StyledMainContainer>
    ); 
}
