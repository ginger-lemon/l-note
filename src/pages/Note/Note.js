import React from "react";
import Styles from './Note.module.css'
import Button from "../../components/button/Button";

const Note = () => {
    return (
        <main className={Styles.container}>
            <article className={Styles.article}>
                <h1 className={Styles.title}>標題</h1>
                <h6 className={Styles.author}>作者・2023/10/24</h6>
                <p>內文</p>
            </article>
            <aside className={Styles.aside}>
                <Button 
                    buttonName="Edit"
                />
                <Button 
                    buttonName="Share"
                />
            </aside>
        </main>
    )
}

export default Note