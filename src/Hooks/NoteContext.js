import React, { children, createContext, useContext, useEffect, useState } from "react";

export const NoteDataContext = createContext();

export const NoteDataContextProvider = ({ children }) => {
    // general-used state
    const [noteTitle, setNoteTitle] = useState('untitle');
    const [noteAuthor, setNoteAuthor] = useState('Unknow');
    const [noteTexts, setNoteTexts] = useState('A secret.');
    const [notePassword, setNotePassword] = useState('');
    const [availableDays, setAvailableDays] = useState(Infinity);
    const [noteDate, setNoteDate] = useState(undefined);
    const [noteTimeStamp, setNoteTimeStamp] = useState(undefined);
    const [noteID, setNoteID] = useState('');
    // const [noteUID, setNoteUID] = useState(undefined); 

    // 需要使用到 localStorage 的情況，設置 localStorage
    // 將 localStorage 儲存的資料當成值初始化各 state 
    // useEffect(() => {
    //     const storedState = localStorage.getItem("localNoteState");
    //     if (storedState) {
    //         const stateData = JSON.parse(storedState);
    //         setNoteTitle(stateData.noteTitle);
    //         setNoteAuthor(stateData.noteAuthor);
    //         setNoteTexts(stateData.noteTexts);
    //         setNotePassword(stateData.notePassword);
    //         setAvailableDays(stateData.AvailableDays);
    //         noteID = stateData.noteID;
    //         noteDate = stateData.noteDate;
    //     }
    // }, [noteID]);

    return (
        <NoteDataContext.Provider
            value = {{
                noteTitle, setNoteTitle,
                noteAuthor, setNoteAuthor,
                noteDate, setNoteDate,
                noteTexts, setNoteTexts,
                notePassword, setNotePassword,
                availableDays, setAvailableDays,
                noteTimeStamp, setNoteTimeStamp,
                noteID, setNoteID,
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
        notePassword, setNotePassword,
        availableDays, setAvailableDays,
        noteTimeStamp, setNoteTimeStamp,
        noteID, setNoteID,
    } = useContext(NoteDataContext);

    return {
        noteTitle, setNoteTitle,
        noteAuthor, setNoteAuthor,
        noteTexts, setNoteTexts,
        noteDate, setNoteDate,
        notePassword, setNotePassword,
        availableDays, setAvailableDays,
        noteTimeStamp, setNoteTimeStamp,
        noteID, setNoteID,
    };
}


