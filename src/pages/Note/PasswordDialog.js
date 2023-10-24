import React, { useState } from "react";
import Styles from './Note.module.css'
import Dialog from "../../components/dialog/Dialog";
import ShowIcon from "../../img/show-PWD-icon.svg"
import UnshowIcon from "../../img/unshow-PWD-icon.svg"
import { useDispatch } from "react-redux";
import { setUserPassword } from "../../Redux/notes/notesSlice";

const PasswordDialog = ({ handleClick }) => {
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false)

    // TODO: 驗證密碼

    const handleChangePassword = (e) => {
        dispatch(setUserPassword(e.target.value))
    }

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
                    // value={passwordValue}
                    onChange={handleChangePassword}
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