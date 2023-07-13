import React, { useState } from "react";
import { StyledFooter } from "./styles/Styled-footer";
import EditMode from "./components/Editmode";
import NoteMode from "./components/NoteMode";
import { CSSReset} from "./styles/CSS-Reset";
import { NotePackageProvider } from "./contexts/NoteContext";



export default function App() {
    // editMode = 編輯模式 = false； noteMode = 文章模式 = true
    const [toggleMode, setToggleMode] = useState(false);

    return (
        <>  
            <CSSReset />
            <NotePackageProvider>
                { toggleMode ? '' : (
                    <EditMode 
                        setToggleMode={setToggleMode}
                    />
                ) }

                { toggleMode && 
                    <NoteMode 
                        setToggleMode={setToggleMode}
                    /> 
                }
            </NotePackageProvider>
            <StyledFooter>
                Copyright © 2023 L.Note 
            </StyledFooter>
            
        </>
    );
}

