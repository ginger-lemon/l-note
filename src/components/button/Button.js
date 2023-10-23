import React from "react";
import Styles from './Button.module.css'

const Button = ({ buttonType, handleClick, buttonName }) => {
    return (
        <button
            className={Styles.button}
            type={buttonType}
            onClick={handleClick}
        >
            {buttonName}
        </button>
    )
}

export default Button