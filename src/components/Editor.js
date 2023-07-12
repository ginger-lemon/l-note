import React, { useState } from "react";
import Button from "./button.js";
import { StyledAsideContainer, StyledMainContainer } from "../styles/Styled-mainStrucutre.js";
import { StyledArticle } from "../styles/Styled-edit-note";
import Dialog from "./dialog.js";
import { StyledDialogCustomDiv } from "../styles/Styled.Dialog.js";
import { getPublishDate, getPublishTime } from "../library/getPublishData.js";
import { app, database } from "../firebaseConfig.js"
import { collection, addDoc } from "firebase/firestore";

export default function Editor({ setToggleMode }) {
    const [wantDelete, setWantDelete] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [texts, setTexts] = useState('');
    const [availableDays, setAvailableDays] = useState(Infinity);
    const [date, setDate] = useState("2023-07-11");
    const [timeStamp, setTimeStamp] = useState('');
 
    async function sentTestDataToDataBase() {
        try {
            const docRef = await addDoc(collection(database, "notes"), {
                date: date,
                title: title,
                author: author,
                texts: texts,
                isdelete: wantDelete,
                availableDays: availableDays,
                noteUrl: "https://l.note/" + title + date,
                timeStamp: timeStamp,
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    }

    function giveDoneButtonMission() {
        console.log('按到刪除對話框的 Done 按鈕 ')
        setShowDeleteDialog(false);
        console.log('關閉對話框');
        console.log('取得預計刪除的時間：' + availableDays + "天");
    }

    function getNoteData() {
        console.log('取得 note 資料');
    }

    function getDeleteTime(e) {
        const days = e.target.value;
        setAvailableDays(days);
    }

    function handleShowDeleteDialog(e) {
        if (e.target.checked !== false) {
            setShowDeleteDialog(true);
            setWantDelete(true);
        } else {
            setShowDeleteDialog(false);
            setWantDelete(false);
            setAvailableDays(Infinity);
        }
    } 

    function toggleToNoteMode() {
        setToggleMode(true);
    }

    function handlePublish (e) {
        // 取得日期、發送準確時間、將資料送到
        setDate(getPublishDate());
        setTimeStamp(getPublishTime());
        // console.log(getPublishTime());
        console.log('將資料送到 firestore ');
        // 取得時間
        // sentTestDataToDataBase();
        toggleToNoteMode()
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
                    getDeleteTime={getDeleteTime} 
                    doneButtonMission={giveDoneButtonMission}
                /> 
            }
        </StyledMainContainer>
        
    ); 
}

function DeleteDialog({ showDeleteDialog, getDeleteTime, doneButtonMission }) {
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
                    onChange={getDeleteTime}
                >
                </input>
            </StyledDialogCustomDiv>
        </Dialog>
    );
}
