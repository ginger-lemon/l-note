import React from "react";
import Button from "../components/button";
import { useNavigate } from "react-router-dom";
import { StyledErrorMode } from "../styles/Styled-ErrorMode";
import { StyledMainContainer } from "../styles/Styled-Main-Aside";

export default function ErrorMode() {
    const navigate = useNavigate();

    function reDirectToEditMode() {
        navigate('/');
    }

    return (
        <StyledMainContainer>
            <StyledErrorMode>
                <p>404</p>
                <p>This page does not exist anywhere</p>
                <div>
                    <Button 
                        btnName="START A NEW NOTE"
                        onClick={reDirectToEditMode}
                    />
                </div>
            </StyledErrorMode>
        </StyledMainContainer>
    );
}