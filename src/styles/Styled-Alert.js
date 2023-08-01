import styled from "styled-components";

export const StyledAlert = styled.div`
    width: 465px;
    background-color: #F2F2F2;
    border-radius: 20px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    text-align: center;

    /* 定位正中間 */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: +10;

    @media (max-width: 700px) {
        width: 320px;
    }

    h2 {
        font-size: 24px;
        font-family: "Inter";
        font-weight: 700;
        line-height: 1.2em;
        /* padding-top: 36px;
        padding-bottom: 32px; */
        padding: 36px 20px 32px;
    }

    div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin: 0 20px 20px;
        gap: 20px;
    }
`;