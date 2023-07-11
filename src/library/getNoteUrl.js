// generate Url 
// host + data + title

import { getPublishDate } from "./getPublishData";


export function getNoteUrl( title, date ) {

    const newUrl = "https://l.note/" + title.toString() + date;
    
    return newUrl;
} 