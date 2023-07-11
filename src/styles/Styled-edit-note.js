import styled from "styled-components";

export const StyledArticle = styled.article`
    width: 600px;

    header {
        font-family: inherit;
        font-size: 32px;
        font-weight: 700;
        padding: 0 20px 10px 20px;
    }

    textarea {
        width: inherit;
        height: 60vh;
        border: none;
        resize: vertical;
        margin-bottom: 10px;

        /* textarea 的文字（暫定） */
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