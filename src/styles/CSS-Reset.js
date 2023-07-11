/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

import { createGlobalStyle } from "styled-components";

export const CSSReset = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	body {
        font-family: "Noto Sans TC", "Inter";
    }
`;


