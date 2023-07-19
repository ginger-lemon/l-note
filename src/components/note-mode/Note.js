import React from "react";
import { useNoteData } from "../../Hooks/NoteContext";

export default function Note() {
    const { noteTitle, noteAuthor, noteDate, noteTexts } = useNoteData();

    return(
        <>
            <h1 className="header">{noteTitle}</h1>
            <p className="author">{noteAuthor + " ・ " + noteDate}</p>
            <p className="textarea">{noteTexts}</p>
        </>
    );
}
