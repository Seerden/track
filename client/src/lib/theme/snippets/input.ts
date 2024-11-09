import { font } from "@/lib/theme/font";
import { noBorders } from "@/lib/theme/snippets/border";
import { css } from "styled-components";

export const inputStyle = css`
	font-size: ${font.size[0.93]};
	${noBorders};
	padding: 0.3rem 0.5rem;
	box-shadow: 0.4rem 0.4rem 0.1rem -0.2rem #ddd;
	border-radius: 3px;
`;
