import React, { useState } from "react";
import { StyledFooter } from "./styles/Styled-footer";
import Editor from "./components/Editor";
import Note from "./components/note";
import { CSSReset} from "./styles/CSS-Reset";


export default function App() {
    // editMode = 編輯模式； noteMode = 文章模式
    const [noteMode, setNoteMode] = useState(false);

    function toggleEditNoteMode() {
        console.log('按下送出後切換模式');
        setNoteMode(!noteMode);
    }

    return (
        <>  
            <CSSReset />
            {/* <Editor toggleMode={toggleEditNoteMode} /> */}
            <Note toggleMode={toggleEditNoteMode} />
            <StyledFooter>
                Copyright © 2023 L.Note 
            </StyledFooter>
        </>
    );
}

