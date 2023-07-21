import styled from "styled-components";

export const StyledErrorMode = styled.div`
    /* border: 1px solid red; */
    width: 300px;
    height: 600px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    margin: 0 auto;

    p {
        text-align: center;
    }

    p:nth-child(1) {
        /* border: 1px solid blue; */
        font-size: 60px;
        font-family: "inter";
        font-weight: 700;
    }

    div {
        margin-top: 30px;
    }
`;