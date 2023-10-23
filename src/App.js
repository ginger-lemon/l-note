import React, { useState } from "react";
import './styles/global.css'

import Edit from "./pages/Edit/Edit";
import Note from "./pages/Note/Note";
import Error from "./pages/Error/Error";

import NoteMode from "./pages/NoteMode";
import { CSSReset} from "./styles/CSS-Reset";
import { Route, Routes, useParams } from "react-router-dom";
import { NoteDataContextProvider } from "./Hooks/NoteContext";
import ErrorMode from "./pages/ErrorMode";

export default function App() {
    // TO DO: 處理 noteID 的問題，先用 testNote 當測試路徑
    const { id } = useParams();

    return (
        <>  
            {/* <CSSReset /> */}
            <NoteDataContextProvider>
            <Routes>
                <Route path="/" element={<Edit />}/>
                <Route path="/:id" element={<Note/>}/>
                <Route path="/error" element={<Error />} />
            </Routes>
            </NoteDataContextProvider>
        </>
    );
}

