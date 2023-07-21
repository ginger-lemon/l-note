import { createGlobalStyle } from "styled-components";

export const CSSReset = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	body {
        font-family: "Noto Sans TC", "Inter";
		position: relative;
    }
`;


