import React, { useRef } from "react";
import Dialog from "../dialog";
import { StyledDialogCustomDiv } from "../../styles/Styled.Dialog";
import { useNoteData } from "../../Hooks/NoteContext";

export default function DeleteDialog({ showDeleteDialog, doneButtonMission }) {
    const { setAvailableDays } = useNoteData();
    const inputRef = useRef(7);

    function handleChange() {
        const inputValue = inputRef.current.value;
        setAvailableDays(inputValue);
    }

    return (
        <Dialog 
            style={{ display: showDeleteDialog ? 'block' : 'none' }}
            dialogTitle="How long is this note available?"
            dialogDescribe="Delete time: (default: 7 days)"
            doneButtonMission={doneButtonMission}
        >
            <StyledDialogCustomDiv
                style= {{ margin: "10px 0 0 0" }}
            >
                <input
                    type="number"
                    id="deleteTime"
                    ref={inputRef}
                    defaultValue="7"
                    min="3"
                    max="100"
                    style={{
                        width: "250px",
                    }}
                    onChange={handleChange}
                >
                </input>
            </StyledDialogCustomDiv>
        </Dialog>
    );
}
