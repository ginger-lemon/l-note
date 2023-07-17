import React from "react";
import Dialog from "../dialog";
import copyUrlIcon from "../../img/copy-icon.svg"
import { useNoteData } from "../../Hooks/NoteContext";

export default function ShareDialog({ wantShare, copyNoteUrl, doneButtonMission }) {
    const { noteID } = useNoteData();
    const noteUrl = "https://l.note" + "/" + noteID;
    return (
        <Dialog 
            style={{ display: wantShare ? 'block' : 'none' }}
            dialogTitle="Share URL of this note"
            dialogDescribe="URL copied."
            doneButtonMission={doneButtonMission}
        >
                <input
                    style={{ width: "250px" }}
                    readOnly
                    value={noteUrl}
                >
                </input>
                {/* 未複製網址時：You can copy the URL */}
                {/* 按下複製時： URL copied.  */}
                <img 
                    height="48px"
                    src={copyUrlIcon}
                    onClick={(e) => console.log(noteUrl)}
                />
        </Dialog>
    );
}