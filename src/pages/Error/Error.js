import React from "react";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";

const Error = () => {
    const navigate = useNavigate()

    const handleDirectToEdit = () => {
        navigate('/')
    }

    return (
        <div>
            <div>
                <p>404</p>
                <p>This page does not exist anywhere.</p>
            </div>
            <div>
                <Button
                    buttonName="Create a new note"
                    handleClick={handleDirectToEdit}
                />
            </div>
        </div>
    )
}

export default Error