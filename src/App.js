import React, { useState } from "react";
import './styles/global.css'

import Edit from "./pages/Edit/Edit";
import Note from "./pages/Note/Note";
import Error from "./pages/Error/Error";

import { Route, Routes } from "react-router-dom";
import { NoteDataContextProvider } from "./Hooks/NoteContext";

const App = () => {
    return (
        <>  
            <NoteDataContextProvider>
            <Routes>
                <Route path="/" element={<Edit />}/>
                <Route path="/:id" element={<Note/>}/>
                <Route path="*" element={<Error />} />
            </Routes>
            </NoteDataContextProvider>
        </>
    );
}

export default App