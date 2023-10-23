import React, { useState } from "react";
import Styles from './Edit.module.css'

import ShowIcon from '../../img/show-PWD-icon.svg'
import UnshowIcon from '../../img/unshow-PWD-icon.svg'
import Button from "../../components/button/Button";

const Edit = () => {
    const [showPassword, setShowPassword] = useState(false)

    const handleToggleShowPassword = () => {
        setShowPassword(!showPassword);
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
                            // value={}
                            // onChange={}
                        >
                        </textarea>
                        <input 
                            type="text"
                            className={`&{Styles.input} ${Styles.author}`}
                            placeholder="author"
                            // value={}
                            // onChange={}
                        >
                        </input>
                        <textarea 
                            className={`${Styles.textarea} ${Styles.texts}`}
                            placeholder="contents"
                            rows={15}
                            // value={}
                            // onChange={}
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
                    />
                    <Button 
                        buttonName="Reset"
                    />
                    <Button 
                        buttonName="Delete"
                    />
                </div>
            </form>
        </main>
    )
}

export default Edit 