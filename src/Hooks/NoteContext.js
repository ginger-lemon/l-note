import React, { children, createContext, useContext, useState } from "react";

export const NoteDataContext = createContext();

export const NoteDataContextProvider = ({ children }) => {
    // general-used state
    const [noteTitle, setNoteTitle] = useState('untitle');
    const [noteAuthor, setNoteAuthor] = useState('Unknow');
    const [noteTexts, setNoteTexts] = useState('A secret.');
    // const [date, setDate] = useState('2023-07-17');
    // -------------- 功能未追加 ------------------
    const [notePassword, setNotePassword] = useState('');
    // --------------------------------
    // const [wantDelete, setWantDelete] = useState(false);
    let noteDate, noteTimeStamp, noteID;
    const [availableDays, setAvailableDays] = useState(Infinity);
    // const [timeStamp, setTimeStamp] = useState(undefined);
    // const noteID = generateNoteID(title, date);

    // function generateNoteID(title, date) {
    //     const id = 
    //         title.replace(/\s/g, "-") + "-" + date;
    //     return id;
    // }
 
    return (
        <NoteDataContext.Provider
            value = {{
                noteTitle, setNoteTitle,
                noteAuthor, setNoteAuthor,
                noteTexts, setNoteTexts,
                noteDate,
                notePassword, setNotePassword,
                availableDays, setAvailableDays,
                noteTimeStamp,
                noteID
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
        noteTexts, setNoteTexts,
        noteDate,
        notePassword, setNotePassword,
        availableDays, setAvailableDays,
        noteTimeStamp,
        noteID
    } = useContext(NoteDataContext);

    return {
        noteTitle, setNoteTitle,
        noteAuthor, setNoteAuthor,
        noteTexts, setNoteTexts,
        noteDate, 
        notePassword, setNotePassword,
        availableDays, setAvailableDays,
        noteTimeStamp,
        noteID
    };
}


