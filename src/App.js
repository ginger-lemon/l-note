import React from "react";
import './styles/global.css'

import Edit from "./pages/Edit/Edit";
import Note from "./pages/Note/Note";
import Error from "./pages/Error/Error";

import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
    return (
        <>  
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Edit />}/>
                    <Route path="/:id" element={<Note/>}/>
                    <Route path="*" element={<Error />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App