import { css } from "@emotion/react";
import { noBorders } from "@/lib/theme/snippets/border";

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
