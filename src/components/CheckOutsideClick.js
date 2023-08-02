import React, { useEffect, useRef } from "react";
import { useNoteData } from "../Hooks/NoteContext";

export default function CheckOutsideClick(props) {
    const ref = useRef();
    const { showVarifyDialog, setShowVarifyDialog } = useNoteData();
    const { onClickOutside, children } = props;

    useEffect(() => {

        function handleClickOutside(e) {
            // 比較 ref 是否存在且選到 dialog 外面
            if(ref.current && !ref.current.contains(e.target)) {
                console.log('選到外面');
                setShowVarifyDialog(false);
            } else {
                console.log('選到 dialog');
                setShowVarifyDialog(true);
            }
        }

        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, []);

    if (!children) {
        return null;
    }

    return (
        <div ref={ref}>
            {children}
        </div>
    );
}