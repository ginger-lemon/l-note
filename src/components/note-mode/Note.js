import React from "react";

export default function Note({ title, author, texts, date }) {
    return(
        <>
            <h1 className="header">{title}</h1>
            <p className="author">{author + " ・ " + date}</p>
            <p className="textarea">{texts}</p>
        </>
    );
}
