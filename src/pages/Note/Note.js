import React, { useEffect, useState } from "react";
import Styles from './Note.module.css'
import Button from "../../components/button/Button";
import SharedDialog from "./SharedDialog";

import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { database } from "../../firebaseConfig";
import PasswordDialog from "./PasswordDialog";

const Note = () => {
    const { id } = useParams()
    const [noteData, setData] = useState({})
    const [openSharedDialog, setOpenSharedDialog] = useState(false)
    const [openPasswordDialog, setOpenPasswordDialog] = useState(false)

    // TODO: 當密碼正確，才將資料存到 localStorage 並跳轉到 Edit
    // TODO: getData loading 版面

    const handleOpenPasswordDialog = () => {
        setOpenPasswordDialog(true)
    }

    const handleClosePasswordDialog = () => {
        // TODO: 取得輸入的密碼、連線取得記事密碼
        // TODO: 加密輸入的密碼並與連線取得的密碼比對
        // TODO: 比對成功：資料存到 localStorage 中並跳轉頁面，
        // TODO: 比對失敗：跳出 alert 並關閉視窗
        setOpenPasswordDialog(false)
    }

    const handleOpenSharedDialog = () => {
        setOpenSharedDialog(true)
    }

    const handleCloseSharedDialog = () => {
        setOpenSharedDialog(false)
    }
 
    const getData = async (id) => {
        const docRef = doc(database, "notes", id)
        try {
            const docSnap = await getDoc(docRef)
            const data = docSnap.data()
            if (docSnap) {
                setData({
                    id: data.id,
                    title: data.contents.title,
                    author: data.contents.author,
                    texts: data.contents.texts,
                    publishedTime: data.publishedTime,
                })
            }
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData(id)
    }, [])

    return (
        <main className={Styles.container}>
            <article className={Styles.article}>
                <h1 className={Styles.title}>
                    {noteData.title}
                </h1>
                <h6 className={Styles.author}>
                    {noteData.author}・{noteData.publishedTime}
                </h6>
                <p className={Styles.texts}>
                    {noteData.texts}
                </p>
            </article>
            <aside className={Styles.aside}>
                <Button 
                    buttonName="Edit"
                    handleClick={handleOpenPasswordDialog}
                />
                <Button 
                    buttonName="Share"
                    handleClick={handleOpenSharedDialog}
                />
            </aside>
            { openPasswordDialog ? 
                (<PasswordDialog handleClick={handleClosePasswordDialog} />) 
                : null
            }
            { openSharedDialog ? 
                (<SharedDialog handleClick={handleCloseSharedDialog} />) 
                : null
            }
        </main>
    )
}

export default Note