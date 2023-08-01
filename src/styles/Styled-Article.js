import styled from "styled-components";

export const StyledArticle = styled.article`
    width: 700px;
    /* height: 70vh; */

    @media (max-width: 850px) {
        width: 100%;
    }

    input {
        width: inherit;
        padding: 0 20px 10px;
        border: none;
        outline: none;
        font-size: 18px;
        resize: none;

        /* input 內的字 */
        font-family:  "Noto Sans TC";
    }

    textarea {
        width: 700px;
        border: none;
        outline: none;
        resize: none;
        overflow-y: hidden;

        /* textarea 的文字 */
        font-family: inherit;
        font-size: 18px;
        line-height: 1.5;
        padding: 0 20px 10px;
        font-weight: 400;

        @media (max-width: 850px) {
            width: 100%;
        }
    }

    /* ＝＝＝＝＝ 以下適用 Note ＝＝＝＝＝ */
    /* .header 為 note/edit 共用 */
    .title {
        width: 700px;
        font-size: 32px;
        font-weight: 700;
        padding: 0 20px 10px 20px;

        @media (max-width: 850px) {
            width: 100%;
        }
    }

    .author {
        font-size: 18px;
        width: 100%;
        padding: 0 20px 10px 20px;

        @media (max-width: 850px) {
            width: 100%;
        }
    }

    div {
        margin: 12px 0 24px;

        label {
            /* margin: 5px 0; */
            padding-left: 10px;
            font-family: "Inter";
            font-weight: 100;
            font-size: 18px;
            position: relative;
            margin: 12px 0;
        }

        img {
            position: absolute;
            margin-left: -42px;
        }

        input {
            margin-left: 6px;
            border-bottom: 1px solid #A5A5A5;
            border-radius: 10px;
        }

        @media (max-width: 850px) {
            width: 100%;
        }
    }
`;