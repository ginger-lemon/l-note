import React, { useState } from "react";
import { StyledFooter } from "./styles/Styled-footer";
import { GlobalStyle } from "./styles/Styled-Globe";
import Editor from "./components/Editor";
import Note from "./components/note";


export default function App() {
    return (
        <>  
            <GlobalStyle />
            {/* <Editor/> */}
            {/* <Note /> */}
            <StyledFooter>Copyright © 2023 L.Note</StyledFooter>
        </>
    );
}

