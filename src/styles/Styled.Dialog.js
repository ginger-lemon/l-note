import styled from "styled-components";

export const StyledDialog = styled.div`
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

    @media (max-width: 500px) {
        width: 320px;
    }


    h2 {
        font-size: 24px;
        font-family: "Inter";
        font-weight: 700;
        line-height: 1.2em;
        padding-top: 36px;
        padding-bottom: 32px;
    }

    p {
        font-size: 18px;
        padding: 0 20px 10px 20px;
    }

    span {
        color: A7A7A7;
    }

    input {
        width: 320px;
        height: 40px;
        border: 2px solid #000000;
        border-radius: 10px;
        font-size: 18px;
        margin-bottom: 24px;
        text-align: center;
    
    }
`;