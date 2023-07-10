import React from "react";
import { StyledArticle, StyledMainContainer, StyledAsideContainer } from "../styles/Styled-Globe";
import Button from "./button";

export default function Note() {

    const btnName = "publish"
    return (
        <StyledMainContainer>
            <StyledArticle>
                <h1>This is title a note.</h1>
                <p>這裡有很多內容。</p>
            </StyledArticle>
            <StyledAsideContainer>
                <Button btnName={btnName}>{btnName}</Button>
                <Button btnName={btnName}>{btnName}</Button>
            </StyledAsideContainer>
        </StyledMainContainer>
    );
}