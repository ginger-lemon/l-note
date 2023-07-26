import React, { useEffect, useState } from "react";
import { StyledMainContainer, StyledAsideContainer } from "../styles/Styled-Main-Aside";
import { StyledArticle } from "../styles/Styled-Article";
import Button from "../components/button";
import ShareDialog from "../components/note-mode/ShareDialog";
import Note from "../components/note-mode/Note";
import { useNavigate, useParams } from "react-router-dom";
import { useNoteData } from "../Hooks/NoteContext";
import { getNoteFromDatabase } from "../library/fetchToFirestore";
import VarifyDialog from "../components/note-mode/EditVarifyDialog";

export default function NoteMode() {
    const { 
        noteID,
        setNoteID,
        setNoteTitle,
        setNoteAuthor,
        setNoteDate,
        setNoteTexts,
        setNotePassword,
        setNoteTimeStamp,
        setAvailableDays,

        showVarifyDialog, setShowVarifyDialog
    } = useNoteData();

    const [showShareDialog, setShowShareDialog] = useState(false);

    // 引入 useNavigate() 切換頁面（元件）
    const navigate = useNavigate(); 

    // 取得 url 後的自訂片段
    const { urlNoteID } = useParams(); 

    const [isLoading, setIsLoading] = useState(false);

    // TO DO: 解決閃爍問題
    useEffect(() => {     
            setIsLoading(true);
            getDataFromDatabaseAndSetDatas(urlNoteID);
            setIsLoading(false);
    }, [urlNoteID]);

    // 當 NoteMode mount/unmount 時取得 local sotrage 資料
    async function getDataFromDatabaseAndSetDatas(noteID) {
        try {
            const note = await getNoteFromDatabase(noteID);
            console.log('從資料庫 get 的 note: ');
            console.log(note); // null

            // 將取得的資料更新到變數中
            setNoteTitle(note.title);
            setNoteAuthor(note.author);
            setNoteDate(note.date)
            setNoteTexts(note.texts);
            setAvailableDays(note.availableDays);
            setNotePassword(note.password);
            setNoteTimeStamp(note.timeStamp);
            setNoteID(note.id);
        } catch (error) {
            console.log('404 not found')
            navigate("/error");
        }
    }

    // 按下 Edit 按鈕：驗證密碼 > 正確即可進入編輯模式
    function toggleToEditMode() {
        // TO DO: 之後要處理切換到編輯模式但是網址不變
        handleAccessProgress();
        // navigate("/");
    }

    function handleAccessProgress() {
        // TO DO: 處理可開啟編輯模式的密碼驗證 
        console.log("開啟驗證密碼對話框");
        setShowVarifyDialog(true);
        
    }
    
    return (
        <StyledMainContainer>
            <StyledArticle>
                { isLoading ? null : ((<Note />)) }
            </StyledArticle>
            <StyledAsideContainer>
                <Button 
                    btnName="Edit"
                    onClick={toggleToEditMode}
                />
                <Button 
                    btnName="Share"
                    onClick={() => {setShowShareDialog(!showShareDialog)}}
                />
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
