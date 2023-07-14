import React from "react";
import Dialog from "../dialog";
import { StyledDialogCustomDiv } from "../../styles/Styled.Dialog";

export default function DeleteDialog({ showDeleteDialog, getDeleteTime, doneButtonMission }) {
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
                    defaultValue={7}
                    min="3"
                    max="100"
                    style={{
                        width: "250px",
                    }}
                    onChange={getDeleteTime}
                >
                </input>
            </StyledDialogCustomDiv>
        </Dialog>
    );
}
