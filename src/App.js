import React, { useState } from "react";
import { StyledFooter } from "./styles/Styled-footer";
import EditMode from "./pages/Editmode";
import NoteMode from "./pages/NoteMode";
import { CSSReset} from "./styles/CSS-Reset";
import { NotePackageProvider } from "./contexts/NoteContext";
import { Route, Routes, useParams } from "react-router-dom";

export default function App() {
    // TO DO: 處理 noteID 的問題，先用 testNote 當測試路徑
    let { noteID } = useParams();

    return (
        <>  
            <CSSReset />
            <NotePackageProvider>
            <Routes>
                <Route path="/" element={<EditMode />}/>
                <Route path="/testNote" element={<NoteMode/>}/>
            </Routes>
            </NotePackageProvider>
            <StyledFooter>
                Copyright © 2023 L.Note 
            </StyledFooter>
        </>
    );
}

