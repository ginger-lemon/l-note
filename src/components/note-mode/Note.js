import React from "react";
import { useNoteData } from "../../Hooks/NoteContext";
import ReactMarkdown from "react-markdown";
import "../../styles/custom-markdown.css";

export default function Note() {
    let { noteTitle, noteAuthor, noteDate, noteTexts } = useNoteData();

    return(
        <>
            <h1 className="title">{noteTitle}</h1>
            <p className="author">{noteAuthor + " ・ " + noteDate}</p>
            <ReactMarkdown 
                className="custom-markdown"
                children={noteTexts}
            />
        </>
    );
}
