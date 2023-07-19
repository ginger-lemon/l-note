import React, { useEffect, useState } from "react";
import { StyledMainContainer, StyledAsideContainer } from "../styles/Styled-mainStrucutre";
import { StyledArticle } from "../styles/Styled-edit-note";
import Button from "../components/button";
import ShareDialog from "../components/note-mode/ShareDialog";
import Note from "../components/note-mode/Note";
import { useNavigate } from "react-router-dom";
import { useNoteData } from "../Hooks/NoteContext";
import { getNoteFromDatabase, getNoteFromFirestore } from "../library/fetchToFirestore";

export default function NoteMode() {
    const { 
        setTitle,
        setAuthor,
        setTexts,
        setDate,
        setAvailableDays,
        setPassword
    } = useNoteData();
    
    const [wantShare, setWantShare] = useState(false);
    const navigate = useNavigate();

    // 當 NoteMode mount 時 get 資料庫資料且將值設定到變數中
    useEffect(() => {        
        getDataFromDatabaseAndSetDatas(noteID)
    }, []);

    function getDataFromDatabaseAndSetDatas(noteID) {
        // 解構取得的資料
        const { 
            dataNoteID,
            dataTitle,
            dataAuthor, 
            dataDate,
            dataTexts,
            dataAvailableDays,
            dataPassword,
        } = getNoteFromFirestore(noteID);

        // 從資料庫 get 資料
        getNoteFromDatabase(noteID);

        // 將取得的資料更新到變數中
        setTitle(dataTitle);
        setAuthor(dataAuthor);
        setDate(dataDate);
        setTexts(dataTexts);
        setAvailableDays(dataAvailableDays);
        setPassword(dataPassword);
    }


    function toggleToEditMode() {
        // TO DO: 之後要處理切換到編輯模式但是網址不變
        navigate("/");
    }

    function showShareDialog() {
        setWantShare(!wantShare);
    }

    function copyNoteUrl() {
        const url = "https://l.note" + "/" + noteID;
        console.log('網址：' + url);
    }

    function closeShareDialog() {
        setWantShare(false);
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
                    onClick={showShareDialog}
                >
                </Button>
            </StyledAsideContainer>
            { wantShare && 
                <ShareDialog 
                    doneButtonMission={closeShareDialog}
                    copyNoteUrl={copyNoteUrl}
                />
            }
        </StyledMainContainer>
    );
}
