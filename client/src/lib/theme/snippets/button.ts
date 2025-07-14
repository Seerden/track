import { noBorders } from "@/lib/theme/snippets/border";
import { css } from "@emotion/react";

export const unstyledButton = css`
	${noBorders};
	background-color: transparent;
	margin: 0;
	padding: 0;

	&:hover,
	&:focus,
	&:active {
		outline: none;
	}
`;
