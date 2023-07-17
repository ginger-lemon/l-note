import React, { useContext, useState } from "react";
import Button from "../components/button.js";
import { StyledAsideContainer, StyledMainContainer } from "../styles/Styled-mainStrucutre.js";
import { StyledArticle } from "../styles/Styled-edit-note.js";
import { getPublishDate, getPublishTime } from "../library/getPublishData.js";
import { useNoteData } from "../Hooks/NoteContext.js";
import DeleteDialog from "../components/edit-mode/DeleteDialog.js";
import Editor from "../components/edit-mode/Editor.js";
import { useNavigate } from "react-router-dom";

export default function EditMode() {
    const { setDate, noteID } = useNoteData();

    // 管理對話框的動態
    const [wantDelete, setWantDelete] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    // 管理生存時間（ for TTL ）相關
    const [availableDays, setAvailableDays] = useState(Infinity);
    const [timeStamp, setTimeStamp] = useState('');

    // 切換頁面網址
    const navigate = useNavigate();

    // giveDoneButtonMission
    function closeDeleteDialog() {
        setShowDeleteDialog(false);
        console.log('取得預計刪除的時間：' + availableDays + "天");
    }

    function getDeleteTime(e) {
        const days = e.target.value;
        setAvailableDays(days);
    }

    function handleShowDeleteDialog(e) {
        if (e.target.checked !== false) {
            setShowDeleteDialog(true);
            setWantDelete(true);
        } else {
            setShowDeleteDialog(false);
            setWantDelete(false);
            setAvailableDays(Infinity);
        }
    } 

    function toggleToNoteMode() {
        console.log('切換到 NoteMode ');
        // testNote 之後會切換成 noteID 
        console.log(noteID);
        navigate("/`${noteID}`");   
    }

    function handlePublish (e) {
        e.preventDefault();
        // 取得日期、發送準確時間、將資料送到
        setDate(getPublishDate());
        setTimeStamp(getPublishTime());
        // console.log(getPublishTime());
        console.log('將資料送到 firestore ');
        // 取得時間
        // sentNoteDataToDatabase();
        toggleToNoteMode()
    }
    
    return (
        <StyledMainContainer>
            <StyledArticle>
                <Editor 
                    handlePublish={handlePublish}
                    handleShowDeleteDialog={handleShowDeleteDialog}
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
            { showDeleteDialog  && 
                <DeleteDialog 
                    getDeleteTime={getDeleteTime} 
                    doneButtonMission={closeDeleteDialog}
                /> 
            }
        </StyledMainContainer>
        
    ); 
}
