import React, { useState } from "react";
import { StyledFooter } from "./styles/Styled-footer";
import Editor from "./components/Editor";
import Note from "./components/note";
import { CSSReset} from "./styles/CSS-Reset";


export default function App() {

    return (
        <>  
            <CSSReset />
            <Editor/>
            {/* <Note /> */}
            <StyledFooter>Copyright © 2023 L.Note</StyledFooter>
        </>
    );
}

