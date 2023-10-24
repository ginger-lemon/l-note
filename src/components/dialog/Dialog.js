import React from "react";
import Styles from './Dialog.module.css'
import Button from "../button/Button";

const Dialog = ({
     title, description, children,
     buttonName, buttonType, handleClick 
    }) => {

    return (
        <div className={Styles.container}>
            <h2>{title}</h2>
            <p>{description}</p>
            {children}
            <div className={Styles.buttonWrapper}>
                <Button 
                    buttonName={buttonName}
                    buttonType={buttonType}
                    handleClick={handleClick}
                />
            </div>
        </div>
    )
}

export default Dialog