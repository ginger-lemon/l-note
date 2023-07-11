import React from "react";
import Button from "./button.js";
import { StyledAsideContainer, StyledMainContainer } from "../styles/Styled-mainStrucutre.js";
import { StyledArticle } from "../styles/Styled-edit-note";
import Dialog from "./dialog.js";
import { StyledDialogCustomDiv } from "../styles/Styled.Dialog.js";

export default function Editor() {

    return (
        <StyledMainContainer>
            {/* <DeleteDialog /> */}
            <StyledArticle>
                <h1>This is L.note</h1>
                <p>Author</p>
                <textarea type="textarea" >23</textarea>
                <div>
                    <input 
                        type="checkbox" 
                        id="01"
                        onClick={(e) => console.log("觸發刪除功能")}
                    >
                    </input>
                    <label>Enable the feature to delete notes in the future? (default by 7 days).</label>
                </div>
            </StyledArticle>
            <StyledAsideContainer>
                <Button 
                    btnName="Publish"
                    onClick={(e) => console.log('送出記事')}
                />
            </StyledAsideContainer>
        </StyledMainContainer>
        
    ); 
}

function DeleteDialog() {
    return (
        <Dialog 
            dialogTitle="How long is this note available?"
            dialogDescribe="Delete time: (default: 7 days)"
        >
            <StyledDialogCustomDiv
                style= {{ margin: "10px 0 0 0" }}
            >
                <input
                    style={{
                        width: "250px",
                    }}
                >
                </input>
            </StyledDialogCustomDiv>
        </Dialog>
    );
}