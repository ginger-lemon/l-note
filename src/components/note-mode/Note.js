import React from "react";
import { useNoteData } from "../../Hooks/NoteContext";
import ReactMarkdown from "react-markdown";

export default function Note() {
    let { noteTitle, noteAuthor, noteDate, noteTexts } = useNoteData();

    return(
        <>
            <h1 className="header">{noteTitle}</h1>
            <p className="author">{noteAuthor + " ・ " + noteDate}</p>
            <div className="note-showMK">
                <ReactMarkdown 
                    children={noteTexts}
                />
            </div>
        </>
    );
}
