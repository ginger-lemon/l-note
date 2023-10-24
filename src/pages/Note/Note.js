import React, { useEffect, useState } from "react";
import Styles from './Note.module.css'
import Button from "../../components/button/Button";
import SharedDialog from "./SharedDialog";
import PasswordDialog from "./PasswordDialog";

import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { database } from "../../firebaseConfig";
import { useSelector } from "react-redux";
import { SHA256 } from "crypto-js";

const Note = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [noteData, setData] = useState({})
    const [openSharedDialog, setOpenSharedDialog] = useState(false)
    const [openPasswordDialog, setOpenPasswordDialog] = useState(false)
    const userPassword = useSelector(state => state.notes.userPassword)

    const getData = async (id) => {
        const docRef = doc(database, "notes", id)
        try {
            const docSnap = await getDoc(docRef)
            if (docSnap) {
                const data = docSnap.data()
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
        // localStorage.removeItem("note")
    }, [])

    const getPasswordData = async (id) => {
        let passwordData = null
        const docRef = doc(database, "notes", id)
        try {
            const docSnap = await getDoc(docRef)
            if (docSnap) {
                const data = docSnap.get("password")
                return passwordData = data
            }
        } catch (error) {
            console.error(error)
        }
    }

    // Edit 對話框根據密碼比對結果處理切換編輯模式或關閉視窗
    const handleClosePasswordDialog = async () => {
        const passwordData = await getPasswordData(noteData.id)
        const encryptedUserPassword = SHA256(userPassword).toString()

        if (encryptedUserPassword === passwordData) {
            localStorage.setItem("note", JSON.stringify({
                id: noteData.id,
                title: noteData.title,
                author: noteData.author,
                texts: noteData.texts,
            }))
            setOpenPasswordDialog(false)
            navigate('/')
        } else {
            alert('Password Error, please input again later.')
            setOpenPasswordDialog(false)
        }
    }

    // 對話框開合
    const handleOpenPasswordDialog = () => {
        setOpenPasswordDialog(true)
    }

    const handleOpenSharedDialog = () => {
        setOpenSharedDialog(true)
    }

    const handleCloseSharedDialog = () => {
        setOpenSharedDialog(false)
    }
 
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