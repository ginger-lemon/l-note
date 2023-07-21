import React from "react";
import { useNoteData } from "../../Hooks/NoteContext";

export default function Editor({ handleShowDeleteDialog, handleShowSetPasswordDialog, handlePublish }) {
    const { 
        noteTitle, setNoteTitle,
        noteAuthor, setNoteAuthor, 
        noteTexts, setNoteTexts,
        notePassword,
    } = useNoteData();

    return (
        <form
            id="editForm" 
            onSubmit={handlePublish}
        >
            {/* <header> */}
                <input 
                style={{ width:"700px" }}
                text="text" 
                className="header" 
                placeholder="Title"
                onChange={(e) => {
                    setNoteTitle(e.target.value);
                }}
                required
                defaultValue={noteTitle}
                >
                </input>
            {/* </header> */}
            <input 
                text="text" 
                className="author" 
                placeholder="Author"
                onChange={(e) => {
                    setNoteAuthor(e.target.value);
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
                    setNoteTexts(e.target.value);
                }}
                defaultValue={noteTexts}
            >
            </textarea>
        <div>
            {/* 設定刪除時間 */}
            <input 
                type="checkbox" 
                id="checkDelete"
                onClick={handleShowDeleteDialog}
            >
            </input>
            <label>Enable the feature to delete this note in the future? (default by 7 days).</label>
            <br />
            {/* 設定密碼 */}
            <input
                type="checkbox"
                id="checkSetPassword"
                onClick={handleShowSetPasswordDialog}
            >
            </input>
            <label>Enable the option to set a password for editing this note in the future?</label>
        </div>
    </form>
    );
}
