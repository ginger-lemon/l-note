import styled, { createGlobalStyle } from "styled-components";

export const StyledMainContainer = styled.main`
    border: 1px solid red;
    margin: 60px 0 100px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;


    @media (max-width: 700px) {
        margin: 60px 20px 100px;
        gap: 30px;
        justify-content: left;
    }
`;

export const StyledArticle = styled.article`
    border: 1px solid blue;
    width: 600px;

    header {
        font-family: inherit;
        font-size: 32px;
        font-weight: 700;
        padding: 0 20px 10px 20px;
    }

    textarea {
        resize: none;
        width: inherit;
        height: 540px;
        margin-bottom: 10px;
        font-family: inherit;
        font-size: 18px;
    }

    div {
        /* border: 1px solid red; */
        label {
            padding-left: 15px;
            font-family: "Inter";
            font-weight: 100;
            font-size: 18px;
        }
    }
`;

export const StyledAsideContainer = styled.aside`
    border: 1px solid green;
    margin-top: 5px;
    gap: 30px;
    display: flex;
    flex-direction: column;


    @media (max-width: 700px) {
        flex-direction: row;
    }
`;

export const GlobalStyle = createGlobalStyle`
    body {
        font-family: "Noto Sans TC", "Inter";
    }
`;