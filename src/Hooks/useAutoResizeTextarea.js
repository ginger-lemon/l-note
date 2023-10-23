import { useEffect, useRef } from "react";

function useAutoResizeTextatea(value) {
    const ref = useRef();

    // TODO:處理打字時會重新 re-render 置底問題
    
    useEffect(() => {
        resizeTextarea();
    }, [value]);

    function resizeTextarea() {
        if (ref.current) {
            ref.current.style.height = 'auto';
            ref.current.style.height = ref.current.scrollHeight + 'px';
        }
    }

    return ref;
}

export default useAutoResizeTextatea;

// useEffect(() => {
//     resizeTextsTextArea();
// }, [noteTexts]);

// function resizeTitleTextArea() {
//     titleInputRef.current.style.height = "auto";
//     titleInputRef.current.style.height = titleInputRef.current.scrollHeight + "px";
// }