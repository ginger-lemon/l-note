import React from "react";
import { StyledArticle, StyledMainContainer, StyledAsideContainer } from "../styles/Styled-Globe";
import Button from "./button";
import Dialog from "./dialog";

export default function Note() {
    // const btnName = ["Edit", "Share"];
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
        <Dialog dialogTitle="Share URL of this note">
            <p>URL copied.</p>
            <div>
                <input></input>
                <Button 
                    btnName="copy"
                    style={{ display: "inline-block" }}
                    onClick={() => console.log('複製網址')}
                />
            </div>
        </Dialog>
    );
}