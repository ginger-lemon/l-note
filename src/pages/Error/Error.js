import React from "react";
import Styles from './Error.module.css'
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";


const Error = () => {
    const navigate = useNavigate()

    const handleDirectToEdit = () => {
        navigate('/')
    }

    return (
        <main>
            <div className={Styles.container}>
                <p className={Styles.title}>404</p>
                <p className={Styles.texts}>This page does not exist anywhere.</p>
                <Button
                    buttonName="Create a new note"
                    handleClick={handleDirectToEdit}
                />
            </div>
        </main>
    )
}

export default Error