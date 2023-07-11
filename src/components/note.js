import React, { useState } from "react";
import { StyledMainContainer, StyledAsideContainer } from "../styles/Styled-mainStrucutre";
import { StyledArticle } from "../styles/Styled-edit-note";
import Button from "./button";
import Dialog from "./dialog";
import copyUrlIcon from "../img/copy-icon.svg";

export default function Note() {
    const [wantShare, setWantShare] = useState(false);

    const note = {
        date: "2023-07-11",
        title: "This is title",
        author: "Apple",
        texts: "This is texts!",
        isdelete: false,
        deleteTime: "7",
    };

    let { date, title, author, texts } = note;

    function showShareDialog() {
        console.log('我要複製網址');
        setWantShare(!wantShare);
    }

    function getNoteUrl() {
        console.log('getUrl');
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
                    onClick={() => console.log('切換到 editor.js')}
                >
                </Button>
                <Button 
                    btnName="Share"
                    onClick={showShareDialog}
                >
                </Button>
            </StyledAsideContainer>
            { wantShare && <ShareDialog />}
        </StyledMainContainer>
    );
}


function ShareDialog({ noteUrl }) {
    return (
        <Dialog 
            dialogTitle="Share URL of this note"
            dialogDescribe="URL copied."
        >
                <input
                    style={{
                        width: "250px",
                    }}
                >
                </input>
                {/* 未複製網址時：You can copy the URL */}
                {/* 按下複製時： URL copied.  */}
                <img 
                    height="48px"
                    src={copyUrlIcon}
                    onClick={() => console.log('複製網址')}
                />
        </Dialog>
    );
}