import React, { useEffect, useRef, useState } from "react";
import { StyledMainContainer, StyledAsideContainer } from "../styles/Styled-Main-Aside";
import { StyledArticle } from "../styles/Styled-Article";
import Button from "../components/button/Button";
import ShareDialog from "../components/note-mode/ShareDialog";
import Note from "../components/note-mode/Note";
import { useNavigate, useParams } from "react-router-dom";
import { useNoteData } from "../Hooks/NoteContext";
import { getNoteFromDatabase, getPasswordFromDatabase } from "../library/fetchToFirestore";
import VarifyPasswordDialog from "../components/VarifyPasswordDialog";
import { SHA256 } from "crypto-js";

export default function NoteMode() {
    const { 
        setNoteID,
        setNoteTitle,
        setNoteAuthor,
        setNoteDate,
        setNoteTexts,
        setNoteTimeStamp,

        inputPassword, 
        showVarifyDialog, setShowVarifyDialog,
        setInputError,
    } = useNoteData();
    const [note, setNote] = useState({
        title: '', 
        author: '',
        date: '',
        texts: '',
        timeStamp: '',
        id: ''
    });
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
    }, []);

    async function getDataFromDatabaseAndSetDatas(noteID) {
        try {
            const note = await getNoteFromDatabase(noteID);
        
            setNote({
                title: note.title, 
                author: note.author,
                date: note.date,
                texts: note.texts,
                timeStamp: note.timeStamp,
                id: note.id,
            });
            
        } catch (error) {
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
        const correctPassword = await getPasswordFromDatabase(note.id);
        const encryptedInputPassword = SHA256(inputPassword).toString();

        // 處理密碼驗證
        if (encryptedInputPassword === correctPassword) {
            setShowVarifyDialog(false);

            setNoteTitle(note.title);
            setNoteAuthor(note.author);
            setNoteDate(note.date)
            setNoteTexts(note.texts);
            setNoteTimeStamp(note.timeStamp);
            setNoteID(note.id);

            navigate("/");
        } else {
            setInputError(true);
        }
    }
    
    return (
        <StyledMainContainer>
            <StyledArticle>
                { isLoading 
                    ? null 
                    : ((<Note note={note}/>)) }
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
                    urlNoteID={urlNoteID}
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
