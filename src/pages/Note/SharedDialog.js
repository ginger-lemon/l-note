import React, { useRef, useState } from "react";
import Styles from './Note.module.css'
import Dialog from "../../components/dialog/Dialog";
import CopyIcon from "../../img/copy-icon.svg"
import { useParams } from "react-router-dom";

const SharedDialog = ({ handleClick }) => {
    const [isCopied, setIsCopied] = useState(false)
    const { id } = useParams()
    const copyRef = useRef()
    const noteUrl = "https://l-note-app.web.app/" + id

    const copyNoteUrl = () => { 
        /**
         *  navigator.clipboard: 在剪貼簿上讀取與寫入資料
         *  navigator.clipboard.writeText(): 在系統上寫入任何字串
         */
        copyRef.current.select()
        setIsCopied(true)
        navigator.clipboard.writeText(noteUrl)
    }

    return (
        <Dialog
            title="Share URL of this note"
            description={isCopied ? "Url copied." : "Click icon to copy."}
            buttonName="Done"
            buttonType="button"
            handleClick={handleClick}
        >
            <div className={Styles.children}>
                <input
                    className={Styles.childrenInput}
                    type="texts"
                    value={noteUrl}
                    ref={copyRef}
                    readOnly
                >
                </input>
                <img
                    className={Styles.childrenImg}
                    src={CopyIcon}
                    alt=""
                    onClick={copyNoteUrl}
                />
            </div>
        </Dialog>
    )
}

export default SharedDialog