import React, { useEffect, useRef, useState } from "react";
import Styles from './Edit.module.css'
import Button from "../../components/button/Button";
import ShowIcon from '../../img/show-PWD-icon.svg'
import UnshowIcon from '../../img/unshow-PWD-icon.svg'
import useAutoResizeTextarea from "../../Hooks/useAutoResizeTextarea";

import { SHA256 } from "crypto-js";
import { useNavigate } from "react-router-dom";
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { database } from "../../firebaseConfig";

const Edit = () => {
    const initialNote = {
        id: null,
        title: '',
        author: '',
        texts: '',
        password: '',
    }

    const [showPassword, setShowPassword] = useState(false)
    const [passwordHint, setPasswordHint] = useState('Please set the password')
    const [note, setNote] = useState(
        () => {
            const storageData = JSON.parse(localStorage.getItem("note"))
            return storageData ? storageData : initialNote
        }
    )
    const titleRef = useAutoResizeTextarea(note.title)
    const textsRef = useAutoResizeTextarea(note.texts)
    const passwordRef = useRef()
    const hintRef = useRef()

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
            await updateDoc(dataRef, data)
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

    // 送出記事
    const handlePublish = (e) => {
        e.preventDefault()
        if (!note.password || note.password.length < 6 ) {
            alert("Please set the password with 6-12 characters.")
            passwordRef.current.focus()
            setNote({ ...note, password: '', })

            return
        }
        
        const publishedTime = getPublishTime()
        const encryptedPassword = SHA256(note.password).toString()

        if (note.id === null) {
            const noteId = note.title === '' 
                ? 'untitle' + '-' + publishedTime
                : note.title.replace(/\s/g, '-') + '-' + publishedTime

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
            navigate(`/${noteId}`)

        } else if (note.id !== null) {
            updateData(note.id, {
                contents : {
                    title: note.title, 
                    author: note.author,
                    texts: note.texts,
                },
                password: encryptedPassword
            })
            navigate(`/${note.id}`)
        }
    }

    // 按鈕觸發事件處理器
    const handleDeleteNoteData = (e, title) => {
        e.preventDefault()
        const needToDelete = window.confirm("Are you sure to delete?")
        if (needToDelete) {
            alert(`"${title}" has been deleted!`)
            deleteData(note.id)
            localStorage.removeItem("note")
            setNote(initialNote)
        } else {
            return
        }
    } 
 
    const handleToggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    // 資料事件處理器
    const handleSetNote = (e) => {
        setNote((prev) => ({ ...prev, [e.target.name]: e.target.value}))
    }
    // const handleChangeTitle = (e) => {
    //     setNote({ ...note, title: e.target.value })
    // }

    // const handleChangeAuthor = (e) => {
    //     setNote({ ...note, author: e.target.value })
    // }

    // const handleChangeTexts = (e) => {
    //     setNote({ ...note, texts: e.target.value})
    // }

    const handleChangePassword = (e) => {
        // ^字串開頭｜[]允許的字元集合規則｜+複數字元｜$字串結尾
        if (!/^[a-zA-Z0-9]+$/.test(e.target.value)) {
            hintRef.current.classList.remove(Styles.hintGreen)
            setPasswordHint('Number and English only.')
            hintRef.current.classList.add(Styles.hintRed)
        } else if (e.target.value.length < 6) {
            hintRef.current.classList.remove(Styles.hintGreen)
            setPasswordHint('Password should be 6-12 characters')
            hintRef.current.classList.add(Styles.hintRed)
        } else {
            hintRef.current.classList.remove(Styles.hintRed)
            hintRef.current.classList.add(Styles.hintGreen)
            setPasswordHint('Password done. Please remember the password.')
        }
        setNote({ ...note, password: e.target.value })   
    }

    return (
        <main>
            <form className={Styles.form}>
                <div className="">
                    <div className={Styles.inputsWrapper}>
                        <textarea 
                            className={`${Styles.textarea} ${Styles.title}`}
                            name="title"
                            type="textarea"
                            placeholder="Title"
                            rows={1}
                            ref={titleRef}
                            value={note.title}
                            onChange={handleSetNote}
                        >
                        </textarea>
                        <input 
                            type="text"
                            className={`&{Styles.input} ${Styles.author}`}
                            name="author"
                            placeholder="Author"
                            value={note.author}
                            onChange={handleSetNote}
                        >
                        </input>
                        <textarea 
                            className={`${Styles.textarea} ${Styles.texts}`}
                            name="texts"
                            placeholder="Contents, can write easy markdown type."
                            ref={textsRef}
                            rows={15}
                            value={note.texts}
                            onChange={handleSetNote}
                        >
                        </textarea>
                        <div className={Styles.passwordWrapper}>
                            <div>
                                <label className={Styles.label}>
                                    Set Password: 
                                </label>
                                <input 
                                    className={Styles.password}
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="6-12 characters"
                                    mimLength={6}
                                    maxLength={12}
                                    ref={passwordRef}
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
                                <span 
                                    className={`${Styles.hint} ${Styles.hintRed}` }
                                    ref={hintRef}
                                >
                                    {passwordHint}
                                </span>  
                            </div>
                        </div>
                    </div>
                </div>
                <div className={Styles.buttonWrapper}>
                    <Button 
                        buttonName="Publish"
                        handleClick={handlePublish}
                    />
                    { note.id === null || 
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