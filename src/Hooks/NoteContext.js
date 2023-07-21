import React, { children, createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const NoteDataContext = createContext();

export const NoteDataContextProvider = ({ children }) => {
    // general-used state
    const [noteTitle, setNoteTitle] = useLocalStorage("title", "Untitled");
    const [noteAuthor, setNoteAuthor] = useLocalStorage("author", "Unknow");
    const [noteTexts, setNoteTexts] = useLocalStorage("texts", "A note.");
    const [notePassword, setNotePassword] = useState("");
    const [availableDays, setAvailableDays] = useState(Infinity);
    const [noteDate, setNoteDate] = useState('2023-07-21');
    const [noteTimeStamp, setNoteTimeStamp] = useLocalStorage("timeStamp", 11111);
    const [noteID, setNoteID] = useLocalStorage("id", "");    

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


