import React, { useRef, useState } from "react";
import Dialog from "../dialog/Dialog";
import copyUrlIcon from "../../img/copy-icon.svg"

export default function ShareDialog({ setShowShareDialog, urlNoteID }) {
    const [isCopied, setIsCopied] = useState(false);
    const copyUrlRef = useRef();
    const noteUrl = "https://" + "l-note-app.web.app" + "/" + urlNoteID;

    function closeShareDialog() {
        setShowShareDialog(false);
    }

    function copyNoteUrl() {
        // select the field 
        copyUrlRef.current.select();
        setIsCopied(true);
        navigator.clipboard.writeText(noteUrl);
    }

    return (
        <Dialog 
            title="Share URL of this note"
            describe={isCopied && "Url copied."}
            handleClick={closeShareDialog}
        >
            <input
                style={{ width: "250px" }}
                ref={copyUrlRef}
                value={noteUrl}
                readOnly
            >
            </input>
            {/* 未複製網址時：You can copy the URL */}
            {/* 按下複製時： URL copied.  */}
            <img 
                height="48px"
                src={copyUrlIcon}
                onClick={copyNoteUrl}
            />
        </Dialog>
    );
}