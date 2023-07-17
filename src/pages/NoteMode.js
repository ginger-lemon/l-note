import React, { createContext, useContext, useEffect, useState } from "react";
import { StyledMainContainer, StyledAsideContainer } from "../styles/Styled-mainStrucutre";
import { StyledArticle } from "../styles/Styled-edit-note";
import Button from "../components/button";
import ShareDialog from "../components/note-mode/ShareDialog";

import Note from "../components/note-mode/Note";
import { useNavigate } from "react-router-dom";
import { useNoteData } from "../Hooks/NoteContext";

export default function NoteMode() {
    const [wantShare, setWantShare] = useState(false);
    const navigate = useNavigate();

    function toggleToEditMode() {
        console.log('將模式切換到 NoteMode ');
        // TO DO: 之後要處理切換到編輯模式但是網址不變
        navigate("/");
        // 讓網址保留
    }

    function showShareDialog() {
        console.log('我要複製網址');
        setWantShare(!wantShare);
    }

    function copyNoteUrl() {
        console.log('getUrl');
        console.log('網址：' + noteUrl);
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
