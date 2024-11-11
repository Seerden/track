import { noBorders } from "@/lib/theme/snippets/border";
import { css } from "styled-components";

export const unstyledButton = css`
	${noBorders};
	margin: 0;
	padding: 0;

	&:hover,
	&:focus,
	&:active {
		outline: none;
	}
`;
