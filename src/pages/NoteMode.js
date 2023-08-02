import React, { useEffect, useRef, useState } from "react";
import { StyledMainContainer, StyledAsideContainer } from "../styles/Styled-Main-Aside";
import { StyledArticle } from "../styles/Styled-Article";
import Button from "../components/button";
import ShareDialog from "../components/note-mode/ShareDialog";
import Note from "../components/note-mode/Note";
import { useNavigate, useParams } from "react-router-dom";
import { useNoteData } from "../Hooks/NoteContext";
import { getNoteFromDatabase, getPasswordFromDatabase } from "../library/fetchToFirestore";
import VarifyPasswordDialog from "../components/VarifyPasswordDialog";
import { SHA256 } from "crypto-js";

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
    const dialogWrapRef = useRef();

    const navigate = useNavigate(); 
    const { urlNoteID } = useParams(); 
    
    // ＝＝＝＝＝ click outside to close dialog ＝＝＝＝＝
    useEffect(() => {
        function clickOutsideToCloseDialog(e) {
            if (dialogWrapRef.current && !dialogWrapRef.current.contains(e.target)) {
                setShowVarifyDialog(false);
            } else {
                return;
            }
        }
        document.addEventListener('click', clickOutsideToCloseDialog)

        return () => {
            document.removeEventListener('click', clickOutsideToCloseDialog);
        }
    }, [])

    // ＝＝＝＝＝ 切換到 NoteMode 時 getDoc ＝＝＝＝＝
    useEffect(() => {     
        // TO DO: 解決閃爍問題
        setIsLoading(true);
        getDataFromDatabaseAndSetDatas(urlNoteID);
        setIsLoading(false);
    }, [urlNoteID]);

    async function getDataFromDatabaseAndSetDatas(noteID) {
        try {
            const note = await getNoteFromDatabase(noteID);
            // console.log('從資料庫 get 的 note: ');
            // console.log(note); // null

            // 將取得的資料更新到變數中
            setNoteTitle(note.title);
            setNoteAuthor(note.author);
            setNoteDate(note.date)
            setNoteTexts(note.texts);
            setAvailableDays(note.availableDays);
            setNoteTimeStamp(note.timeStamp);
            setNoteID(note.id);
        } catch (error) {
            // console.log('404 not found')
            navigate("/error");
            clearLoccalStorage();
        }
    }

    function clearLoccalStorage() {
        localStorage.removeItem("title");
        localStorage.removeItem("texts");
        localStorage.removeItem("author");
        localStorage.removeItem("timeStamp");
        localStorage.removeItem("id");

        history.go(0);
    }

    // ＝＝＝＝＝ 處理按下 edit 按鈕切換到 Edit Mode ＝＝＝＝＝
    function handleClickEditButton(e) {
        e.stopPropagation(); // 防止 document 偵測到底下的事件
        setShowVarifyDialog(true);
    }

    async function varifyDoneButtonMisson() {
        const correctPassword = await getPasswordFromDatabase(noteID);
        const encryptedInputPassword = SHA256(inputPassword).toString();
        
        // console.log('correctPassword: ', correctPassword);
        // console.log('encryptedInputPassword: ', encryptedInputPassword);

        // 處理密碼驗證
        if (encryptedInputPassword === correctPassword) {
            // console.log('inputPassword === correctPassword');
            setShowVarifyDialog(false);
            navigate("/");

        } else {
            setInputError(true);
            // setInputErrorMessage('Password is uncorrect!')
        }
    }
    
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
                    ref={dialogWrapRef}
                    doneButtonMission={varifyDoneButtonMisson}
                />
            )}
        </StyledMainContainer>
    );
}
