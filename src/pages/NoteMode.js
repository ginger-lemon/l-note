import React, { useEffect, useState } from "react";
import { StyledMainContainer, StyledAsideContainer } from "../styles/Styled-Main-Aside";
import { StyledArticle } from "../styles/Styled-Article";
import Button from "../components/button";
import ShareDialog from "../components/note-mode/ShareDialog";
import Note from "../components/note-mode/Note";
import { useNavigate, useParams } from "react-router-dom";
import { useNoteData } from "../Hooks/NoteContext";
import { getNoteFromDatabase, getPasswordFromDatabase } from "../library/fetchToFirestore";
import VarifyPasswordDialog from "../components/VarifyPasswordDialog";

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

        inputPassword, setInputPassword,
        showVarifyDialog, setShowVarifyDialog,
        inputError, setInputError,
        inputErrorMessage, setInputErrorMessage,
    } = useNoteData();

    const [showShareDialog, setShowShareDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // ＝＝＝＝＝ 切換到 NoteMode 時 getDoc ＝＝＝＝＝
    const navigate = useNavigate(); 
    const { urlNoteID } = useParams(); 
    
    useEffect(() => {     
        // TO DO: 解決閃爍問題
        setIsLoading(true);
        getDataFromDatabaseAndSetDatas(urlNoteID);
        setIsLoading(false);
    }, [urlNoteID]);

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

    // ＝＝＝＝＝ 處理按下 edit 按鈕切換到 Edit Mode ＝＝＝＝＝
    function handleClickEditButton() {
        setShowVarifyDialog(true);
    }

    async function varifyDoneButtonMisson() {
        console.log('開始驗證密碼');
        console.log('inputPassword: ', inputPassword);
        console.log('noteID: ', noteID);

        const correctPassword = await getPasswordFromDatabase(noteID);
        console.log('correctPassword: ', correctPassword);

        if (inputPassword === correctPassword) {
            console.log('inputPassword === correctPassword');
            setShowVarifyDialog(false);
            navigate("/");

        } else {
            setInputError(true);
            setInputErrorMessage('Password is uncorrect!')
        }

    }

    // 按下 Edit 按鈕：驗證密碼 > 正確即可進入編輯模式
    // function toggleToEditMode() {
        // TO DO: 之後要處理切換到編輯模式但是網址不變
        // handleAccessProgress();
        // navigate("/");
    // }

    // function handleAccessProgress() {
        // TO DO: 處理可開啟編輯模式的密碼驗證 
    //     console.log("開啟驗證密碼對話框");
    //     setShowVarifyDialog(true);
    // }
    
    return (
        <StyledMainContainer>
            <StyledArticle>
                { isLoading ? null : ((<Note />)) }
            </StyledArticle>
            <StyledAsideContainer>
                <Button 
                    btnName="Edit"
                    onClick={handleClickEditButton}
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
            { showVarifyDialog && (
                <VarifyPasswordDialog 
                    doneButtonMission={varifyDoneButtonMisson}
                />
            )}
        </StyledMainContainer>
    );
}
