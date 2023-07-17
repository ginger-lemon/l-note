import React, { useState } from "react";
import { StyledFooter } from "./styles/Styled-footer";
import EditMode from "./pages/Editmode";
import NoteMode from "./pages/NoteMode";
import { CSSReset} from "./styles/CSS-Reset";
import { Route, Routes, useParams } from "react-router-dom";
import { NoteDataContextProvider, useNoteData } from "./Hooks/NoteContext";

export default function App() {
    // TO DO: 處理 noteID 的問題，先用 testNote 當測試路徑
    const { noteID } = useParams();

    return (
        <>  
            <CSSReset />
            <NoteDataContextProvider>
            <Routes>
                <Route path="/" element={<EditMode />}/>
                <Route path="/:noteID" element={<NoteMode/>}/>
            </Routes>
            </NoteDataContextProvider>
            <StyledFooter>
                Copyright © 2023 L.Note 
            </StyledFooter>
        </>
    );
}

