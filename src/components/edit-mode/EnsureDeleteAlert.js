import React from "react";
import Button from "../button";
import { StyledAlert } from "../../styles/Styled-Alert";
import { useNoteData } from "../../Hooks/NoteContext";

export default function EnsureDeleteAlert() {
    const { setShowDeleteAlert, setShowVarifyDialog } = useNoteData();

    function handleClickYesButton(e) {
        e.stopPropagation();
        setShowVarifyDialog(true);
        setShowDeleteAlert(false);
    }

    function handleClickNoButton() {
        setShowDeleteAlert(false);
    }

    return (
        <StyledAlert>
            <h2>Do you really want to delete this note?</h2>
            <div>
                <Button 
                    btnName="Yes"
                    onClick={handleClickYesButton}
                />
                <Button 
                    btnName="No"
                    onClick={handleClickNoButton}
                />
            </div>
        </StyledAlert>
    );
}