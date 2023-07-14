import React, { useContext, useState } from "react";
import Button from "../components/button.js";
import { StyledAsideContainer, StyledMainContainer } from "../styles/Styled-mainStrucutre.js";
import { StyledArticle } from "../styles/Styled-edit-note.js";
import { getPublishDate, getPublishTime } from "../library/getPublishData.js";
import { database } from "../firebaseConfig.js"
import { collection, addDoc } from "firebase/firestore";
import { NotePackageContext } from "../contexts/NoteContext.js";
import DeleteDialog from "../components/edit-mode/DeleteDialog.js";
import Editor from "../components/edit-mode/Editor.js";

export default function EditMode({ setToggleMode }) {
    const [wantDelete, setWantDelete] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [texts, setTexts] = useState('');
    const [availableDays, setAvailableDays] = useState(Infinity);
    const [date, setDate] = useState("2023-07-11");
    const [timeStamp, setTimeStamp] = useState('');

    // 接收 notePackage 
    const { notePackage } = useContext(NotePackageContext);
    const noteTitle = notePackage.title;
    const noteAuthor = notePackage.author;
    const noteTexts = notePackage.texts;
 
    // ＝＝＝＝ 以下處理將資料儲存到 fireStore ＝＝＝＝
    async function sentNoteDataToDatabase() {
        try {
            const docRef = await addDoc(collection(database, "notes"), {
                date: date,
                title: title,
                author: author,
                texts: texts,
                isdelete: wantDelete,
                availableDays: availableDays,
                noteUrl: "https://l.note/" + title + "/" + date,
                timeStamp: timeStamp,
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    }
    // ＝＝＝＝ 以上處理將資料儲存到 fireStore ＝＝＝＝

    function giveDoneButtonMission() {
        console.log('按到刪除對話框的 Done 按鈕 ')
        setShowDeleteDialog(false);
        console.log('關閉對話框');
        console.log('取得預計刪除的時間：' + availableDays + "天");
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
        e.preventDefault();
        // 取得日期、發送準確時間、將資料送到
        setDate(getPublishDate());
        setTimeStamp(getPublishTime());
        // console.log(getPublishTime());
        console.log('將資料送到 firestore ');
        // 取得時間
        // sentNoteDataToDatabase();
        toggleToNoteMode()
    }
    
    return (
        <StyledMainContainer>
            <StyledArticle>
                <Editor 
                    handlePublish={handlePublish}
                    setTitle={setTitle}
                    setAuthor={setAuthor}
                    setTexts={setTexts}
                    noteTitle={noteTitle}
                    noteAuthor={noteAuthor}
                    noteTexts={noteTexts}
                    handleShowDeleteDialog={handleShowDeleteDialog}
                />
            </StyledArticle>
            <StyledAsideContainer>
                <Button 
                    type="submit"
                    form="noteForm"
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
