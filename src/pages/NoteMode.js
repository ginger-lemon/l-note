import React, { useEffect, useState } from "react";
import { StyledMainContainer, StyledAsideContainer } from "../styles/Styled-mainStrucutre";
import { StyledArticle } from "../styles/Styled-edit-note";
import Button from "../components/button";
import ShareDialog from "../components/note-mode/ShareDialog";
import Note from "../components/note-mode/Note";
import { useNavigate } from "react-router-dom";
import { useNoteData } from "../Hooks/NoteContext";
import { fakeNote } from "../data/fakeData";

export default function NoteMode() {
    const { 
        setTitle,
        setAuthor,
        setTexts,
        setAvailableDays,
    } = useNoteData();
    
    const [wantShare, setWantShare] = useState(false);
    const navigate = useNavigate();

    // 當 NoteMode mount 時 get 資料庫資料且將值設定到變數中
    useEffect(() => {
        const { 
            dataTitle,
            dataAuthor, 
            dataTexts,
            dataAvailableDays,
        } = fakeNote;

        setTitle(dataTitle);
        setAuthor(dataAuthor);
        setTexts(dataTexts);
        setAvailableDays(dataAvailableDays);
    }, []);

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
