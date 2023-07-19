import React, { useRef } from "react";
import Dialog from "../dialog";
import { StyledDialogCustomDiv } from "../../styles/Styled.Dialog";
import { useNoteData } from "../../Hooks/NoteContext";

export default function DeleteDialog({ setShowDeleteDialog }) {
    const { setAvailableDays } = useNoteData();
    const inputRef = useRef(7);

    function closeDeleteDialog() {
        setShowDeleteDialog(false);
    }

    function handleChange() {
        const inputValue = inputRef.current.value;

        if ( inputValue >= 3 && inputValue <= 100) {
            setAvailableDays(inputValue);
        } else {
            alert("number should between 3 and 100");
            inputRef.current.valueOf = 7;
        }
        

    }

    return (
        <Dialog 
            dialogTitle="How long is this note available?"
            dialogDescribe="Delete time: (default: 7 days)"
            doneButtonMission={closeDeleteDialog}
        >
            <StyledDialogCustomDiv
                style= {{ margin: "10px 40px 0" }}
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
