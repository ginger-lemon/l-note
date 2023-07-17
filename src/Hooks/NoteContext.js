import React, { children, createContext, useContext, useState } from "react";

export const NoteDataContext = createContext();

export const NoteDataContextProvider = ({ children }) => {
    // general-used state
    const [title, setTitle] = useState('untitle');
    const [author, setAuthor] = useState('Unknow');
    const [texts, setTexts] = useState('A secret.');
    const [date, setDate] = useState('2023-07-17');
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
        timeStamp, setTimeStamp,
        noteID
    } = useContext(NoteDataContext);

    return {
        title, setTitle,
        author, setAuthor,
        texts, setTexts,
        date, setDate,
        timeStamp, setTimeStamp,
        noteID
    };
}


