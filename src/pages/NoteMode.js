import React, { useEffect, useState } from "react";
import { StyledMainContainer, StyledAsideContainer } from "../styles/Styled-mainStrucutre";
import { StyledArticle } from "../styles/Styled-edit-note";
import Button from "../components/button";
import ShareDialog from "../components/note-mode/ShareDialog";
import Note from "../components/note-mode/Note";
import { useNavigate } from "react-router-dom";
import { useNoteData } from "../Hooks/NoteContext";
import { getNoteFromDatabase } from "../library/fetchToFirestore";
import VarifyDialog from "../components/note-mode/EditVarifyDialog";

export default function NoteMode() {
    const { 
        noteID, 
        setNoteTitle,
        setNoteAuthor,
        setNoteTexts,
        setAvailableDays,
        setNotePassword,
        setNoteDate,
        setNoteTimeStamp,
    } = useNoteData();
    
    const [showShareDialog, setShowShareDialog] = useState(false);
    const [showVarifyDialog, setShowVarifyDialog] = useState(false);
    const navigate = useNavigate();

    console.log('哪有人切換頁面之後 noteID 就不間啊＠＠：', noteID)

    // 當 NoteMode mount 時 get 資料庫資料且將值設定到變數中
    useEffect(() => {        
        console.log('測試 noteID 的值：' , noteID)
        getDataFromDatabaseAndSetDatas(noteID);

    }, []);

    async function getDataFromDatabaseAndSetDatas(noteID) {
        // 解構取得的資料
        // const { 
        //     title,
        //     author, 
        //     date,
        //     texts,
        //     availableDays,
        //     password,
        //     timeStamp,
        // } = getNoteFromDatabase(noteID);

        // 從資料庫 get 資料
        const note = await getNoteFromDatabase(noteID);

        console.log('note');
        console.log(note);

        // 將取得的資料更新到變數中
        setNoteTitle(note.title);
        setNoteAuthor(note.author);
        setNoteTexts(note.texts);
        setAvailableDays(note.availableDays);
        setNotePassword(note.password);
        setNoteDate(note.date);
        setNoteTimeStamp(note.timeStamp);
    }

    // 按下 Edit 按鈕：驗證密碼 > 正確即可進入編輯模式
    function toggleToEditMode() {
        // TO DO: 之後要處理切換到編輯模式但是網址不變
        navigate("/");
    }

    function handleAccessProgress() {
        // TO DO: 處理可開啟編輯模式的密碼驗證 
        console.log("開啟驗證密碼對話框");
        setShowVarifyDialog(true);
    }
    
    return (
        <StyledMainContainer>
            <StyledArticle>
                <Note />
            </StyledArticle>
            <StyledAsideContainer>
                <Button 
                    btnName="Edit"
                    onClick={toggleToEditMode}
                >
                </Button>
                <Button 
                    btnName="Share"
                    onClick={() => {setShowShareDialog(!showShareDialog)}}
                >
                </Button>
            </StyledAsideContainer>
            { showShareDialog && 
                <ShareDialog 
                    setShowShareDialog={setShowShareDialog}
                />
            }
            { showVarifyDialog && 
                <VarifyDialog 
                    setShowVarifyDialog={setShowVarifyDialog}
                />
            }

        </StyledMainContainer>
    );
}
