import React from "react";
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import { render, screen } from "../../../Hooks/test-utlis";
import Editor from "../Editor";


describe('Editor should be rendered', () => {
    test('edit area', () => {
        render(<Editor />);
        const titleTextArea = screen.getByPlaceholderText('Title');
        const authorInput = screen.getByPlaceholderText('Author');
        const textsTextArea = screen.getByPlaceholderText('Your note. Available for easy markdown type.');
        
        expect(titleTextArea).toBeInTheDocument();
        expect(authorInput).toBeInTheDocument();
        expect(textsTextArea).toBeInTheDocument();
    });

    test('password area', () => {
        render(<Editor />);
        const passwordInput = screen.getByPlaceholderText('6-12 letters and numbers');
        const showPasswordImg = screen.getByRole('img');
        
        expect(passwordInput).toBeInTheDocument();
        expect(showPasswordImg).toBeInTheDocument();
    });
});

describe('testing password hint', () => {
    test('there is no password ', async () => {
        userEvent.setup();
        const handleSetPassword = jest.fn();
        render(<Editor handleSetPassword={handleSetPassword}/>);

        const passwordInput = screen.getByPlaceholderText('6-12 letters and numbers');
        const hintSpan = screen.getByText('Please set password for this note.')

        expect(passwordInput).toHaveValue('');
        expect(hintSpan).toHaveTextContent('Please set password for this note.')
    });

    test('if password satisify condition', async () => {
        userEvent.setup();
        const handleSetPassword = jest.fn();
        render(<Editor handleSetPassword={handleSetPassword}/>);

        const passwordInput = screen.getByPlaceholderText('6-12 letters and numbers');
        const hintSpan = screen.getByText('Please set password for this note.')

        await userEvent.type(passwordInput, '12345678');

        expect(passwordInput).toHaveValue('12345678');
        expect(hintSpan).toHaveTextContent('Password done.')
    });

    test('length of password less than 6', async () => {
        userEvent.setup();
        const handleSetPassword = jest.fn();
        render(<Editor handleSetPassword={handleSetPassword}/>);

        const passwordInput = screen.getByPlaceholderText('6-12 letters and numbers');
        const hintSpan = screen.getByText('Please set password for this note.')

        await userEvent.type(passwordInput, '1234');

        expect(passwordInput).toHaveValue('1234');
        expect(hintSpan).toHaveTextContent('Password should be 6-12 characters.')
    });
    
    test('password has something not letter and numbers', async () => {
        userEvent.setup();
        const handleSetPassword = jest.fn();
        render(<Editor handleSetPassword={handleSetPassword}/>);

        const passwordInput = screen.getByPlaceholderText('6-12 letters and numbers');
        const hintSpan = screen.getByText('Please set password for this note.')

        await userEvent.type(passwordInput, '1234ㄅ');

        expect(passwordInput).toHaveValue('1234ㄅ');
        expect(hintSpan).toHaveTextContent('Number and English letters only')
    });
})