import React from "react";
import ReactMarkdown from "react-markdown";
import "../../styles/custom-markdown.css";

export default function Note({ note }) {
    return(
        <>
            <h1 className="title">{note.title}</h1>
            <p className="author">{note.author + " ・ " + note.date}</p>
            <ReactMarkdown 
                className="custom-markdown"
                children={note.texts}
            />
        </>
    );
}
