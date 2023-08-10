import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import Editor from "../Editor";
import { NoteDataContextProvider } from "../../../Hooks/NoteContext";

describe('Editor should be rendered', () => {
    test('title textarea', () => {
        render(<Editor />, {
            wrapper: NoteDataContextProvider,
        });
        const titleTextArea = screen.getByPlaceholderText('Title');
        expect(titleTextArea).toBeInTheDocument();
    })
});