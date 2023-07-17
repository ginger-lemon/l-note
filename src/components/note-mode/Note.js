import React from "react";
import { useNoteData } from "../../Hooks/NoteContext";

export default function Note() {
    const { title, author, date, texts } = useNoteData();

    return(
        <>
            <h1 className="header">{title}</h1>
            <p className="author">{author + " ・ " + date}</p>
            <p className="textarea">{texts}</p>
        </>
    );
}
