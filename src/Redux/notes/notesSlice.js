import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: '',
    title: '',
    author: '',
    texts: '',
    password: '',
    userPassword: '',
}

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        setUserPassword: (state, action) => {
            return {
                ...state,
                userPassword: action.payload
            }
        },
    }
})

export const { setUserPassword } = notesSlice.actions

export default notesSlice.reducer