import React, { children, createContext, useContext, useState, useEffect } from "react";

// Note, Edit mode 共享 notePackage 與 setNotePackage

// const fakeTestNote = {
//     title: 'Test Fake Data',
//     author: 'Lemon',
//     date: '2023-07-13',
//     texts: 'This is fake data, preventing fetch to firestore too many times.',
//     noteUrl: "https://l.note/Test-Fake-Data-2023-07-13"
// }

export const NoteDataContext = createContext();

export const NoteDataContextProvider = ({ children }) => {
    // general-used state
    const [title, setTitle] = useState('untitle');
    const [author, setAuthor] = useState('Unknow');
    const [texts, setTexts] = useState('A secret.');
    const [date, setDate] = useState('');
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
        noteID
    } = useContext(NoteDataContext);

    return {
        title, setTitle,
        author, setAuthor,
        texts, setTexts,
        date, setDate,
        noteID
    };
}


