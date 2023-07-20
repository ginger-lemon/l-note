import React, { children, createContext, useContext, useState } from "react";

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
    const [noteID, setNoteID] = useState(undefined); 

    // let noteDate, noteTimeStamp, noteID;

    return (
        <NoteDataContext.Provider
            value = {{
                noteTitle, setNoteTitle,
                noteAuthor, setNoteAuthor,
                noteTexts, setNoteTexts,
                noteDate, setNoteDate,
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
        noteTexts, setNoteTexts,
        noteDate, setNoteDate,
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


