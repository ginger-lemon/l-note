import React, { useState } from "react";
import Button from "../components/button.js";
import { StyledAsideContainer, StyledMainContainer } from "../styles/Styled-mainStrucutre.js";
import { StyledArticle } from "../styles/Styled-edit-note.js";
import { getPublishDate, getPublishTime } from "../library/getPublishData.js";
import { useNoteData } from "../Hooks/NoteContext.js";
import DeleteDialog from "../components/edit-mode/DeleteDialog.js";
import Editor from "../components/edit-mode/Editor.js";
import { useNavigate } from "react-router-dom";
import { setNoteToDatabase, updateNoteToDatabase} from "../library/fetchToFirestore.js";
import SetPasswordDialog from "../components/edit-mode/SetPasswordDialog.js";

export default function EditMode() {
    const { 
        title, author, date, texts, password,
        timeStamp, setTimeStamp,
        availableDays, setAvailableDays,
        setDate, noteID
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
        } else {
            setShowDeleteDialog(false);
            setAvailableDays(Infinity);
        }
    } 

    // // 處理關閉刪除時間對話框
    // function closeDeleteDialog() {
    //     setShowDeleteDialog(false);
    // }

    function toggleToNoteMode() {
        console.log('切換到 NoteMode ');
        // testNote 之後會切換成 noteID 
        console.log(noteID);
        navigate(`/${noteID}`);   
    }

    // 如果 timestamp === undefined => 資料庫無資料， set
    // 如果 timestamp !== undefined => 曾經發送資料， update
    function handlePublish (e) {
        e.preventDefault();

        // 處理資料新增/更新
        if (timeStamp === undefined) {
            setDate(getPublishDate());
            setTimeStamp(getPublishTime());
            console.log('使用 set 新增資料');

            // 使用 set 新增資料
            // setNoteToDatabase(noteID, {
            //     noteID,
            //     title, 
            //     author,
            //     date,
            //     texts,
            //     availableDays,
            //     password,
            //     timeStamp,
            // });
            
            toggleToNoteMode();

        } else {
            console.log('使用 update 更新資料，不能更新到 title');
            // 使用 update 更新資料
            // updateNoteToDatabase(noteID, {
            //     title, 
            //     author,
            //     texts,
            //     availableDays,
            //     password,
            // });

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
