import React, { useState } from "react";
import Button from "./button.js";
import { StyledAsideContainer, StyledMainContainer } from "../styles/Styled-mainStrucutre.js";
import { StyledArticle } from "../styles/Styled-edit-note";
import Dialog from "./dialog.js";
import { StyledDialogCustomDiv } from "../styles/Styled.Dialog.js";
import {  getPublishDate, getPublishTime } from "../library/getPublishData.js";

export default function Editor({ toggleMode }) {
    const [wantDelete, setWantDelete] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [texts, setTexts] = useState('');
    const [availableDays, setAvailableDays] = useState(7);
 
    const note = {
        date: "2023-07-11", 
        title: title,
        author: author,
        texts: texts,
        isdelete: wantDelete,
        deleteTime: "7",
        noteUrl: "https://l.note/" + title + date,
    };

    let { date } = note;

    function giveDoneButtonMission() {
        console.log('按到刪除對話框的 Done 按鈕 ')
        setShowDeleteDialog(false);
        console.log('關閉對話框');
        console.log('取得預計刪除的時間：' + availableDays + "天");
    }

    function getNoteData() {
        console.log('取得 note 資料');
        console.log(note);
    }

    function getDeleteTime(e) {
        const days = e.target.value;
        setAvailableDays(days);
    }

    function handleShowDeleteDialog(e) {
        if (e.target.value !== false) {
            setShowDeleteDialog(!showDeleteDialog);
            setWantDelete(!wantDelete);
        }
    } 

    function handlePublish (e) {
        console.log('取得資料');
        getNoteData();
        console.log('取得送出的時間');
        getPublishTime();
        console.log(getPublishTime());
        console.log('將資料送到 firestore ');
        console.log('跳轉到 note 模式');
        // setNoteMode(true);
    }
    
    return (
        <StyledMainContainer>
            <StyledArticle>
                <input 
                    text="text" 
                    className="header" 
                    placeholder="Title"
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                >
                </input>
                <input 
                    text="text" 
                    className="author" 
                    placeholder="Author"
                    onChange={(e) => {
                        setAuthor(e.target.value);
                    }}
                >
                </input>
                    <textarea 
                    // TODO: 要讓 textarea 的高度跟著文字數量自動增加
                        id="textarea"
                        type="textarea" 
                        placeholder="Your content."
                        onChange={(e) => {
                            setTexts(e.target.value);
                        }}
                    >
                    </textarea>
                <div>
                    <input 
                        type="checkbox" 
                        id="checkDelete"
                        onClick={handleShowDeleteDialog}
                    >
                    </input>
                    <label>Enable the feature to delete notes in the future? (default by 7 days).</label>
                </div>
            </StyledArticle>
            <StyledAsideContainer>
                <Button 
                    type="submit"
                    btnName="Publish"
                    onClick={handlePublish}
                />
            </StyledAsideContainer>
            { showDeleteDialog  && 
                <DeleteDialog 
                    onChange={getDeleteTime} 
                    doneButtonMission={giveDoneButtonMission}
                /> 
            }
        </StyledMainContainer>
        
    ); 
}

function DeleteDialog({ showDeleteDialog, onChange, doneButtonMission }) {
    return (
        <Dialog 
            style={{ display: showDeleteDialog ? 'block' : 'none' }}
            dialogTitle="How long is this note available?"
            dialogDescribe="Delete time: (default: 7 days)"
            doneButtonMission={doneButtonMission}
        >
            <StyledDialogCustomDiv
                style= {{ margin: "10px 0 0 0" }}
            >
                <input
                    type="number"
                    id="deleteTime"
                    defaultValue={7}
                    min="3"
                    max="100"
                    style={{
                        width: "250px",
                    }}
                    onChange={onChange}
                >
                </input>
            </StyledDialogCustomDiv>
        </Dialog>
    );
}
