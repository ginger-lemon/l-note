import React, { useState } from "react";
import { StyledFooter } from "./styles/Styled-footer";
import { GlobalStyle } from "./styles/Styled-Globe";
import Editor from "./components/Editor";
import Note from "./components/note";
import { CSSReset } from "./styles/CSS-Reset";


export default function App() {

    return (
        <>  
            <CSSReset />
            <GlobalStyle />
            {/* <Editor/> */}
            <Note />
            <StyledFooter>Copyright © 2023 L.Note</StyledFooter>
        </>
    );
}

