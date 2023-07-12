import React, { useState } from "react";
import { StyledFooter } from "./styles/Styled-footer";
import Editor from "./components/Editor";
import Note from "./components/note";
import { CSSReset} from "./styles/CSS-Reset";


export default function App() {
    // editMode = 編輯模式 = false； noteMode = 文章模式 = true
    const [toggleMode, setToggleMode] = useState(false);

    return (
        <>  
            <CSSReset />
            { toggleMode ? '' : (
                 <Editor setToggleMode={setToggleMode} />
            ) }
           
            { toggleMode && 
                <Note 
                    setToggleMode={setToggleMode}
                /> 
            }
            
            <StyledFooter>
                Copyright © 2023 L.Note 
            </StyledFooter>
        </>
    );
}

