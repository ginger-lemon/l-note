import React, { children, createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const NoteDataContext = createContext();

export const NoteDataContextProvider = ({ children }) => {
    // 控制 app 使用主要的 state  

    // ＝＝＝＝ data should store in the local storage ＝＝＝＝ 
    const [noteTitle, setNoteTitle] = useLocalStorage("title", "Untitled");
    const [noteAuthor, setNoteAuthor] = useLocalStorage("author", "Unknow");
    const [noteTexts, setNoteTexts] = useLocalStorage("texts", "A note. Available for easy markdown type.");
    const [noteTimeStamp, setNoteTimeStamp] = useLocalStorage("timeStamp", 11111);
    const [noteID, setNoteID] = useLocalStorage("id", ""); 

    // ＝＝＝＝ related with setDoc/updateDoc/deleteDoc ＝＝＝＝
    const [notePassword, setNotePassword] = useState('');
    const [availableDays, setAvailableDays] = useState(Infinity);
    const [noteDate, setNoteDate] = useState('2023-07-21');

    // ＝＝＝＝ control dialogs ＝＝＝＝
    // 控制輸入密碼驗證的對話框、輸入的密碼比對
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [showVarifyDialog, setShowVarifyDialog] = useState(false); 
    const [inputPassword, setInputPassword] = useState('');
    const [inputError, setInputError] = useState(false);
    const [inputErrorMessage, setInputErrorMessage] = useState(null);
    const [isFocusPasswordInput, setIsFocusPasswordInput] = useState(false); // 發佈時如果沒有密碼時 focus 輸入框
 
    return (
        <NoteDataContext.Provider
            value = {{
                noteTitle, setNoteTitle,
                noteAuthor, setNoteAuthor,
                noteDate, setNoteDate,
                noteTexts, setNoteTexts,
                noteID, setNoteID,

                notePassword, setNotePassword,
                noteTimeStamp, setNoteTimeStamp,

                showDeleteAlert, setShowDeleteAlert,
                showVarifyDialog, setShowVarifyDialog,
                inputPassword, setInputPassword,
                inputError, setInputError,
                inputErrorMessage, setInputErrorMessage,
                isFocusPasswordInput, setIsFocusPasswordInput,
            }}
        >
            {children}
        </NoteDataContext.Provider>
    );
}

export function useNoteData() {
    const {
        noteTitle, setNoteTitle,
        noteAuthor, setNoteAuthor,
        noteDate, setNoteDate,
        noteTexts, setNoteTexts,
        noteID, setNoteID,

        notePassword, setNotePassword,
        noteTimeStamp, setNoteTimeStamp,

        showDeleteAlert, setShowDeleteAlert,
        showVarifyDialog, setShowVarifyDialog,
        inputPassword, setInputPassword,
        inputError, setInputError,
        inputErrorMessage, setInputErrorMessage,
        isFocusPasswordInput, setIsFocusPasswordInput
    } = useContext(NoteDataContext);

    return {
        noteTitle, setNoteTitle,
        noteAuthor, setNoteAuthor,
        noteDate, setNoteDate,
        noteTexts, setNoteTexts,
        noteID, setNoteID,

        notePassword, setNotePassword,
        noteTimeStamp, setNoteTimeStamp,

        showDeleteAlert, setShowDeleteAlert,
        showVarifyDialog, setShowVarifyDialog,
        inputPassword, setInputPassword,
        inputError, setInputError,
        inputErrorMessage, setInputErrorMessage,
        isFocusPasswordInput, setIsFocusPasswordInput
    };
}


