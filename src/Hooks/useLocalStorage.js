import React, { useState, useEffect } from "react";

// const [item, setItem] = useHook(function);
// function: check if need to store to or get from local storage
    // if no data in local -> setItem to local storage
    // if has data in local -> getItem to locak storage (when page refreshed) 
// item: variable, to get item from local storage
// setItem: set value in to variable "item" 

export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => { 
        const valueStoredInLocal = localStorage.getItem(key);
        return valueStoredInLocal !== null ? 
            JSON.parse(valueStoredInLocal) : initialValue;
    });

    // 當 value 變動時資料就存到 local storage 中 
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value]);

    return [value, setValue];
} 