import React, { useEffect, useState } from "react";
import Styles from './Note.module.css'
import Button from "../../components/button/Button";

import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { database } from "../../firebaseConfig";

const Note = () => {
    const { id } = useParams()
    const [noteData, setData] = useState({})

    // TODO: 當密碼正確，才將資料存到 localStorage 並跳轉到 Edit
    // TODO: getData loading 版面

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
                />
                <Button 
                    buttonName="Share"
                />
            </aside>
            {/* Dialog */}
        </main>
    )
}

export default Note