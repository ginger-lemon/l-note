import styled from "styled-components";

export const StyledArticle = styled.article`
    width: 700px;
    height: 70vh;

    @media (max-width: 850px) {
        width: 100%;
    }

    header, h1 {
        font-family: "Noto Sans TC";
        font-size: 32px;
        font-weight: 700;
        padding: 0 20px 10px 20px;
    }

    input, p {
        width: inherit;
        padding: 0 20px 10px;
        border: none;
        outline: none;

        /* input 內的字 */
        font-family:  "Noto Sans TC";
        /* font-weight: 400; */
    }

    .header {
        font-size: 32px;
        font-weight: 700;
    }

    .author {
        font-size: 18px;
        width: 100%;
    }

    textarea {
        width: 700px;
        /* height: auto; */
        min-height: 50vh;
        border: none;
        resize: none;
        margin-bottom: 10px;
        outline: none;

        /* textarea 的文字（暫定） */
        font-family: inherit;
        font-size: 18px;
        padding: 0 20px 10px;
        font-weight: 400;

        @media (max-width: 850px) {
            width: 100%;
        }
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