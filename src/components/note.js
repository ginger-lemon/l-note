import React, { useState } from "react";
import { StyledMainContainer, StyledAsideContainer } from "../styles/Styled-mainStrucutre";
import { StyledArticle } from "../styles/Styled-edit-note";
import Button from "./button";
import Dialog from "./dialog";
import copyUrlIcon from "../img/copy-icon.svg";
import { app, database } from "../firebaseConfig"


export default function Note({ setToggleMode }) {
    const [wantShare, setWantShare] = useState(false);

    const note = {
        date: "2023-07-11",
        title: "This is title",
        author: "Apple",
        texts: "This is texts!",
        isdelete: false,
        deleteTime: "7",
        noteUrl: "https://l.note/" + title + date,
    };

    let { date, title, author, texts, noteUrl } = note;

    function toggleToEditMode() {
        setToggleMode(false);
    }

    function showShareDialog() {
        console.log('我要複製網址');
        setWantShare(!wantShare);
    }

    function copyNoteUrl() {
        console.log('getUrl');
        console.log('網址：' + noteUrl);
    }

    function giveDoneButtonMission() {
        console.log('按到刪除對話框的 Done 按鈕 ')
        setWantShare(false);
        console.log('關閉對話框');
    }
    
    return (
        <StyledMainContainer>
            <StyledArticle>
                <h1>{title}</h1>
                <p>{author + " ・ " + date}</p>
                <p>{texts}</p>
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
                    doneButtonMission={giveDoneButtonMission}
                    copyNoteUrl={copyNoteUrl}
                    noteUrl={noteUrl}
                />
            }
        </StyledMainContainer>
    );
}


function ShareDialog({ wantShare, copyNoteUrl, doneButtonMission, noteUrl }) {
    return (
        <Dialog 
            style={{ display: wantShare ? 'block' : 'none' }}
            dialogTitle="Share URL of this note"
            dialogDescribe="URL copied."
            doneButtonMission={doneButtonMission}
        >
                <input
                    style={{ width: "250px" }}
                    readOnly
                    value={noteUrl}
                >
                </input>
                {/* 未複製網址時：You can copy the URL */}
                {/* 按下複製時： URL copied.  */}
                <img 
                    height="48px"
                    src={copyUrlIcon}
                    onClick={copyNoteUrl}
                />
        </Dialog>
    );
}