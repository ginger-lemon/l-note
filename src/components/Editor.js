import React from "react";
import Button from "./button.js";
import { StyledArticle, StyledAsideContainer, StyledMainContainer } from "../styles/Styled-Globe.js";


export default function Editor() {

    const btnName = "publish"
    return (
        <StyledMainContainer>
            <StyledArticle>
                <header>
                    This is L.note
                </header>
                <textarea type="textarea" >23</textarea>
                <div onClick={() => {console.log("選到 checkbox");}}>
                    <input 
                        type="checkbox" 
                        id="01"
                        >
                    </input>
                    <label>Enable the feature to delete notes in the future? (default by 7 days).</label>
                </div>
            </StyledArticle>
            <StyledAsideContainer>
                <Button btnName={btnName}>{btnName}</Button>
            </StyledAsideContainer>
        </StyledMainContainer>
        
    ); 
}