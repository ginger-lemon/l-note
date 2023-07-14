import React, { useContext, useState } from "react";
import Button from "../components/button.js";
import { StyledAsideContainer, StyledMainContainer } from "../styles/Styled-mainStrucutre.js";
import { StyledArticle } from "../styles/Styled-edit-note.js";
import { getPublishDate, getPublishTime } from "../library/getPublishData.js";
import { NotePackageContext } from "../contexts/NoteContext.js";
import DeleteDialog from "../components/edit-mode/DeleteDialog.js";
import Editor from "../components/edit-mode/Editor.js";
import { useNavigate } from "react-router-dom";

export default function EditMode() {
    const [wantDelete, setWantDelete] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [texts, setTexts] = useState('');
    const [availableDays, setAvailableDays] = useState(Infinity);
    const [date, setDate] = useState("2023-07-11");
    const [timeStamp, setTimeStamp] = useState('');
    const navigate = useNavigate()

    // 接收 notePackage 
    const { notePackage } = useContext(NotePackageContext);
    const noteTitle = notePackage.title;
    const noteAuthor = notePackage.author;
    const noteTexts = notePackage.texts;
    const noteDate = notePackage.Date;

    // ＝＝＝＝處理會放在網址的 noteID 部分(現在先放假資料)＝＝＝＝
    // 之後可能會需要使用 context 傳
    const fakeNoteID = {
        fakeTitle: "Fake NoteID",
        fakeDate: "2023-07-14",
    };

    const { fakeTitle, fakeDate } = fakeNoteID;

    function getFakeNoteID(title, date){
        const resultID = title.replace(/\s/g, "-") + "-" + date;
        return resultID;
    }
    // ＝＝＝＝ 以上處理 noteID ＝＝＝＝ 


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
        console.log('切換到 NoteMode ');
        // testNote 之後會切換成 noteID 
        navigate("/testNote");   
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
