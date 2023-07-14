import React from "react";

export default function Editor({ handlePublish, setTitle, setAuthor, setTexts, noteTitle, noteAuthor, noteTexts, handleShowDeleteDialog }) {
    return (
        <form
        id="editForm" 
        onSubmit={handlePublish}
    >
        <input 
            text="text" 
            className="header" 
            placeholder="Title"
            onChange={(e) => {
                setTitle(e.target.value);
            }}
            required
            defaultValue={noteTitle}
        >
        </input>
        <input 
            text="text" 
            className="author" 
            placeholder="Author"
            onChange={(e) => {
                setAuthor(e.target.value);
            }}
            defaultValue={noteAuthor}
        >
        </input>
            <textarea 
            // TODO: 要讓 textarea 的高度跟著文字數量自動增加
                className="textarea"
                type="textarea" 
                placeholder="Your content."
                onChange={(e) => {
                    setTexts(e.target.value);
                }}
                defaultValue={noteTexts}
            >
            </textarea>
        <div>
            <input 
                type="checkbox" 
                id="checkDelete"
                onClick={handleShowDeleteDialog}
            >
            </input>
            <label>Enable the feature to delete notes in the future? (default by 7 days).</label>
        </div>
    </form>
    );
}
