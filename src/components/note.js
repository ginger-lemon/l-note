import React from "react";
import { StyledArticle, StyledMainContainer, StyledAsideContainer } from "../styles/Styled-Globe";
import Button from "./button";
import Dialog from "./dialog";
import copyUrlIcon from "../img/copy-icon.svg";
import { StyledDialogCustomDiv } from "../styles/Styled.Dialog";

export default function Note() {
    return (
        <StyledMainContainer>
            <ShareDialog />
            <StyledArticle>
                <h1>This is title a note.</h1>
                <p>這裡有很多內容。</p>
            </StyledArticle>
            <StyledAsideContainer>
                <Button 
                    btnName="Edit"
                    onClick={() => console.log('切換到 editor.js')}
                >
                </Button>
                <Button 
                    btnName="Share"
                    onClick={() => console.log('跳出分享頁面')}
                >
                </Button>
            </StyledAsideContainer>
        </StyledMainContainer>
    );
}


function ShareDialog() {
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