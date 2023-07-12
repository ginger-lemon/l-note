import React, { useEffect, useState } from "react";
import { StyledMainContainer, StyledAsideContainer } from "../styles/Styled-mainStrucutre";
import { StyledArticle } from "../styles/Styled-edit-note";
import Button from "./button";
import Dialog from "./dialog";
import copyUrlIcon from "../img/copy-icon.svg";
import { app, database } from "../firebaseConfig"
import { connectFirestoreEmulator, doc, getDoc } from "firebase/firestore";


export default function Note({ setToggleMode }) {
    const [wantShare, setWantShare] = useState(false);
    const [noteData, setNoteData] = useState({});

    const { title, author, date, texts } = noteData;
    
    // const note = {
    //     date: "2023-07-11",
    //     title: "This is title",
    //     author: "Apple",
    //     texts: "This is texts!",
    //     isdelete: false,
    //     deleteTime: "7",
    //     noteUrl: "https://l.note/" + title + date,
    // };

    // let { date, title, author, texts, noteUrl } = note;

    // ＝＝＝＝ 以下處理從 firestore 讀取 snapshot ＝＝＝＝
    async function getNoteDataFromDatabase() {
        try {
            const docRef = doc(database, "notes", "cpYTwVexYQ3o0NNnt8vQ");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return setNoteData(docSnap.data());
            }

        } catch (e) {
            console.error(e);
            return null;
        }

        // const docRef = doc(database, "notes", "cpYTwVexYQ3o0NNnt8vQ");
        // const docSnap = await getDoc(docRef);

        // if (docSnap.exists()) {
        //     // console.log("Document data:");
        //     return docSnap.data();
        // } else {
        // // docSnap.data() will be undefined in this case
        //     console.log("No such document!");
        //     return null;
        // }
    }
    // ＝＝＝＝ 以上處理從 firestore 讀取 snapshot ＝＝＝＝

    // 當切換到 note 模式連線到 firestore 將資料抓下來
    useEffect(() => {
        let isSubsrcibed = true;

        getNoteDataFromDatabase();

        return () => {
            isSubsrcibed = false;
            setNoteData({});
        }

    },[setToggleMode ]);

    function toggleToEditMode() {
        setToggleMode(false);
    }

    function showShareDialog() {
        console.log('我要複製網址');
        setWantShare(!wantShare);
    }

    function copyNoteUrl() {
        console.log('getUrl');
        console.log('網址：' + noteUrl);
    }

    function giveDoneButtonMission() {
        console.log('按到刪除對話框的 Done 按鈕 ')
        setWantShare(false);
        console.log('關閉對話框');
    }
    
    return (
        <StyledMainContainer>
            <StyledArticle>
                <h1>{title}</h1>
                <p>{author + " ・ " + date}</p>
                <p>{texts}</p>
            </StyledArticle>
            <StyledAsideContainer>
                <Button 
                    btnName="Edit"
                    onClick={toggleToEditMode}
                >
                </Button>
                <Button 
                    btnName="Share"
                    onClick={showShareDialog}
                >
                </Button>
            </StyledAsideContainer>
            { wantShare && 
                <ShareDialog 
                    doneButtonMission={giveDoneButtonMission}
                    copyNoteUrl={copyNoteUrl}
                    noteUrl={noteUrl}
                />
            }
        </StyledMainContainer>
    );
}


function ShareDialog({ wantShare, copyNoteUrl, doneButtonMission, noteUrl }) {
    return (
        <Dialog 
            style={{ display: wantShare ? 'block' : 'none' }}
            dialogTitle="Share URL of this note"
            dialogDescribe="URL copied."
            doneButtonMission={doneButtonMission}
        >
                <input
                    style={{ width: "250px" }}
                    readOnly
                    value={noteUrl}
                >
                </input>
                {/* 未複製網址時：You can copy the URL */}
                {/* 按下複製時： URL copied.  */}
                <img 
                    height="48px"
                    src={copyUrlIcon}
                    onClick={copyNoteUrl}
                />
        </Dialog>
    );
}