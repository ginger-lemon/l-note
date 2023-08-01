import styled from "styled-components";

export const StyledMainContainer = styled.main`
    margin: 60px 0 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;

    @media (max-width: 850px) {
        margin: 60px 20px 30px;
        gap: 15px;
        justify-content: left;
    }
`;


export const StyledAsideContainer = styled.aside`
    margin: 5px 0 10px;
    gap: 30px;
    display: flex;
    flex-direction: column;

    @media (max-width: 850px) {
        flex-direction: row;
    }
`;

