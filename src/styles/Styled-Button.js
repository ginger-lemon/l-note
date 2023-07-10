import styled from "styled-components";

export const StyledButton = styled.button`
    /* 按鈕的外誆 */
    border: 3px solid #000000;
    background-color: #ffffff;
    border-radius: 25px;

    /* 文字 */
    color: #000000;
    font-family: "Inter";
    font-size: 18px;
    font-weight: bold;
    padding: 10px 20px;

    display: block;
    margin-bottom: 50px;

    /* 滑鼠 hover */
    &:hover {
    background-color: #000000;
    color: #ffffff;
    cursor: pointer;
    }
`;