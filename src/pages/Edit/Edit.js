import React, { useEffect, useState } from "react";
import Styles from './Edit.module.css'

import Button from "../../components/button/Button";
import ShowIcon from '../../img/show-PWD-icon.svg'
import UnshowIcon from '../../img/unshow-PWD-icon.svg'

import { SHA256 } from "crypto-js";
import { useNavigate } from "react-router-dom";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { database } from "../../firebaseConfig";
import useAutoResizeTextarea from "../../Hooks/useAutoResizeTextarea";

const Edit = () => {
    const initialNote = {
        id: '',
        title: '',
        author: '',
        texts: '',
        password: '',
    }

    const [showPassword, setShowPassword] = useState(false)
    const [note, setNote] = useState(
        () => {
            const storageData = JSON.parse(localStorage.getItem("note"))
            return storageData ? storageData : initialNote
        }
    )
    const titleRef = useAutoResizeTextarea(note.title)
    const textsRef = useAutoResizeTextarea(note.texts)

    const navigate = useNavigate()

    // 資料儲存於 localStorage
    const storageDataToLocalStorage = () => {
        const noteData = {
            id: note.id,
            title: note.title,
            author: note.author,
            texts: note.texts,
        }
        localStorage.setItem("note", JSON.stringify(noteData))
    }

    useEffect(() => {
        storageDataToLocalStorage();
    }, [note])

    // post/update/delete data
    const postData = async (id, data) => {
        try {
            await setDoc(doc(database, "notes", id), data)
        } catch (error) {
            console.error(error)
        }
    }

    const updateData = async (id, data) => {
        const dataRef = doc(database, "notes", id)
        try {
            await updateData(dataRef, data)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteData = async (id) => {
        try {
            await deleteDoc(doc(database, "notes", id))
        } catch (error) {
            console.log(error)
        }
    }
  
    const getPublishTime = () => {
        const time = new Date()
        const year = time.getFullYear()
        const month = time.getMonth() + 1
        const date = time.getDate()
        const publishedTime = year + '-' + month + '-' + date

        return publishedTime
    }

    const handlePublish = (e) => {
        e.preventDefault()
        const publishedTime = getPublishTime()
        const noteId = note.title.replace(/\s/g, '-') + '-' + publishedTime
        const encryptedPassword = SHA256(note.password).toString()

        if (note.id === '') {
            postData(noteId, {
                id: noteId,
                contents: {
                    title: note.title,
                    author: note.author,
                    texts: note.texts,
                },
                password: encryptedPassword,
                publishedTime: publishedTime,
            })
        } else if (note.id !== '') {
            updateData(note.id, {
                contents : {
                    title: note.title,
                    author: note.author,
                    texts: note.texts,
                },
                password: encryptedPassword
            })
        }

        navigate(`/${noteId}`)
    }

    // 按鈕觸發事件處理器
    const handleDeleteNoteData = (e, title) => {
        e.preventDefault()
        const needToDelete = window.confirm("Are you sure delete?")
        if (needToDelete) {
            alert(`"${title}" has been deleted!`)
            deleteData(note.id)
            localStorage.removeItem("note")
            setNote(initialNote)
        } else {
            return
        }
    } 

    const handleResetNoteData = (e) => {
        e.preventDefault()
        localStorage.removeItem("note")
        setNote(initialNote)
    }
 
    const handleToggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    // 資料事件處理器
    const handleChangeTitle = (e) => {
        setNote({ ...note, title: e.target.value })
    }

    const handleChangeAuthor = (e) => {
        setNote({ ...note, author: e.target.value })
    }

    const handleChangeTexts = (e) => {
        setNote({ ...note, texts: e.target.value})
    }

    const handleChangePassword = (e) => {
        setNote({ ...note, password: e.target.value })
    }

    return (
        <main>
            <form className={Styles.form}>
                <div className="">
                    <div className={Styles.inputsWrapper}>
                        <textarea 
                            className={`${Styles.textarea} ${Styles.title}`}
                            type="textarea"
                            placeholder="title"
                            rows={1}
                            ref={titleRef}
                            value={note.title}
                            onChange={handleChangeTitle}
                        >
                        </textarea>
                        <input 
                            type="text"
                            className={`&{Styles.input} ${Styles.author}`}
                            placeholder="author"
                            value={note.author}
                            onChange={handleChangeAuthor}
                        >
                        </input>
                        <textarea 
                            className={`${Styles.textarea} ${Styles.texts}`}
                            placeholder="contents"
                            ref={textsRef}
                            rows={15}
                            value={note.texts}
                            onChange={handleChangeTexts}
                        >
                        </textarea>
                        <div className={Styles.passwordWrapper}>
                            <div>
                                <label className={Styles.label}>
                                    Set Password: 
                                </label>
                                <input 
                                    className={Styles.password}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="6-12"
                                    mimLength={6}
                                    maxLength={12}
                                    value={note.password}
                                    onChange={handleChangePassword}
                                >
                                </input>
                                <img 
                                    className={Styles.img}
                                    src={showPassword ? UnshowIcon : ShowIcon}
                                    height="24px"
                                    onClick={handleToggleShowPassword}
                                />
                            </div>
                            <div>
                                <span className={Styles.label}>
                                    Password hint:  
                                </span>
                                <span className={Styles.hint}>hints</span>  
                            </div>
                        </div>
                    </div>
                </div>
                <div className={Styles.buttonWrapper}>
                    <Button 
                        buttonName="Publish"
                        handleClick={handlePublish}
                    />
                    <Button 
                        buttonName="Reset"
                        handleClick={handleResetNoteData}
                    />
                    { note.id === '' || 
                        <Button 
                            buttonName="Delete"
                            handleClick={(e) => handleDeleteNoteData(e, note.title)}
                        />
                    }
                </div>
            </form>
        </main>
    )
}

export default Edit 