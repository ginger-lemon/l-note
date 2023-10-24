import React, { useState } from "react";
import Styles from './Note.module.css'
import Dialog from "../../components/dialog/Dialog";
import ShowIcon from "../../img/show-PWD-icon.svg"
import UnshowIcon from "../../img/unshow-PWD-icon.svg"

const PasswordDialog = ({ handleClick }) => {
    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState(null)

    // TODO: 驗證密碼

    const handleToggleShowIcon = () => {
        setShowPassword(!showPassword)
    }

    return (
        <Dialog
            title="Please enter the password"
            description="Password should be 6-12 characters."
            buttonName="Done"
            buttonType="button"
            handleClick={handleClick}
        >
            <div className={Styles.children}>
                <input
                    className={Styles.childrenInput}
                    type={showPassword ? "text" : "password"}
                    minLength={6}
                    maxLength={12}
                    placeholder="6-12 numbers"
                    value={password}
                >
                </input>
                <img
                    className={Styles.childrenImg}
                    width="48px"
                    height="48px"
                    src={showPassword ? UnshowIcon : ShowIcon}
                    alt=""
                    onClick={handleToggleShowIcon}
                />
            </div>
        </Dialog>
    )
}

export default PasswordDialog