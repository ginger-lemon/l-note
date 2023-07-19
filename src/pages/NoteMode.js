import React, { useEffect, useState } from "react";
import { StyledMainContainer, StyledAsideContainer } from "../styles/Styled-mainStrucutre";
import { StyledArticle } from "../styles/Styled-edit-note";
import Button from "../components/button";
import ShareDialog from "../components/note-mode/ShareDialog";
import Note from "../components/note-mode/Note";
import { useNavigate } from "react-router-dom";
import { useNoteData } from "../Hooks/NoteContext";
import { getNoteFromDatabase } from "../library/fetchToFirestore";
import VarifyDialog from "../components/note-mode/EditVarifyDialog";

export default function NoteMode() {
    const { 
        setTitle,
        setAuthor,
        setTexts,
        setDate,
        setAvailableDays,
        setPassword
    } = useNoteData();
    
    const [showShareDialog, setShowShareDialog] = useState(false);
    const [showVarifyDialog, setShowVarifyDialog] = useState(false);
    const navigate = useNavigate();

    // 當 NoteMode mount 時 get 資料庫資料且將值設定到變數中
    // useEffect(() => {        
    //     getDataFromDatabaseAndSetDatas(noteID);
    // }, []);

    function getDataFromDatabaseAndSetDatas(noteID) {
        // 解構取得的資料
        const { 
            dataTitle,
            dataAuthor, 
            dataDate,
            dataTexts,
            dataAvailableDays,
            dataPassword,
        } = getNoteFromDatabase(noteID);

        // 從資料庫 get 資料
        getNoteFromDatabase(noteID);

        // 將取得的資料更新到變數中
        setNoteTitle(dataTitle);
        setNoteAuthor(dataAuthor);
        setNoteDate(dataDate);
        setNoteTexts(dataTexts);
        setNoteAvailableDays(dataAvailableDays);
        setNotePassword(dataPassword);
    }

    // 按下 Edit 按鈕：驗證密碼 > 正確即可進入編輯模式
    function toggleToEditMode() {
        // TO DO: 之後要處理切換到編輯模式但是網址不變
        navigate("/");
    }

    function handleAccessProgress() {
        // TO DO: 處理可開啟編輯模式的密碼驗證 
        console.log("開啟驗證密碼對話框");
        setShowVarifyDialog(true);
    }
    
    return (
        <StyledMainContainer>
            <StyledArticle>
                <Note />
            </StyledArticle>
            <StyledAsideContainer>
                <Button 
                    btnName="Edit"
                    onClick={toggleToEditMode}
                >
                </Button>
                <Button 
                    btnName="Share"
                    onClick={() => {setShowShareDialog(!showShareDialog)}}
                >
                </Button>
            </StyledAsideContainer>
            { showShareDialog && 
                <ShareDialog 
                    setShowShareDialog={setShowShareDialog}
                />
            }
            { showVarifyDialog && 
                <VarifyDialog 
                    setShowVarifyDialog={setShowVarifyDialog}
                />
            }

        </StyledMainContainer>
    );
}
