import React, { children, createContext, useContext, useState } from "react";

export const NoteDataContext = createContext();

export const NoteDataContextProvider = ({ children }) => {
    // general-used state
    const [title, setTitle] = useState('untitle');
    const [author, setAuthor] = useState('Unknow');
    const [texts, setTexts] = useState('A secret.');
    const [date, setDate] = useState('2023-07-17');
    // -------------- 功能未追加 ------------------
    const [password, setPassword] = useState('');
    // --------------------------------
    // const [wantDelete, setWantDelete] = useState(false);
    const [availableDays, setAvailableDays] = useState(Infinity);
    const [timeStamp, setTimeStamp] = useState(undefined);
    const noteID = generateNoteID(title, date);

    function generateNoteID(title, date) {
        const id = 
            title.replace(/\s/g, "-") + "-" + date;
        return id;
    }
 
    return (
        <NoteDataContext.Provider
            value = {{
                title, setTitle,
                author, setAuthor,
                texts, setTexts,
                date, setDate,
                // wantDelete, setWantDelete,
                availableDays, setAvailableDays,
                timeStamp, setTimeStamp,
                noteID
            }}
        >
            {children}
        </NoteDataContext.Provider>
    );
}

export function useNoteData() {
    const {
        title, setTitle,
        author, setAuthor,
        texts, setTexts,
        date, setDate,
        // wantDelete, setWantDelete,
        availableDays, setAvailableDays,
        timeStamp, setTimeStamp,
        noteID
    } = useContext(NoteDataContext);

    return {
        title, setTitle,
        author, setAuthor,
        texts, setTexts,
        date, setDate,
        // wantDelete, setWantDelete,
        availableDays, setAvailableDays,
        timeStamp, setTimeStamp,
        noteID
    };
}


