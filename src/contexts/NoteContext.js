import React, { children, createContext, useContext, useState, useEffect } from "react";
import { app, database } from "../firebaseConfig"
import { doc, getDoc } from "firebase/firestore";

// Note, Edit mode 共享 notePackage 與 setNotePackage

const defaultNote = {
    title: '',
    author: '',
    date: '',
    texts: ''
}

export const NotePackageContext = createContext();

export const NotePackageProvider = ({ children }) => {
    const [notePackage, setNotePackage] = useState({defaultNote});

    async function getNoteDataFromDatabase() {
        try {
            const docRef = doc(database, "notes", "cpYTwVexYQ3o0NNnt8vQ");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return setNotePackage(docSnap.data());
            }

        } catch (e) {
            console.error(e);
            return null;
        }
    }

    useEffect(() => {
        let isSubsrcibed = true;

        getNoteDataFromDatabase();
        console.log('抓完資料了')

        return () => {
            isSubsrcibed = false;
            setNotePackage({});
        }

    },[]);

    return (
        <NotePackageContext.Provider 
            value = {{ notePackage, setNotePackage }}
        >
            {children}
        </NotePackageContext.Provider>
    );
}
