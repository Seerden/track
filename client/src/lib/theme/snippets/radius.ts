import { css } from "@emotion/react";

export const radius = {
	small: css`
		border-radius: 3px;
	`,
	medium: css`
		border-radius: 5px;
	`,
	largish: css`
		border-radius: 7px;
	`,
	large: css`
		border-radius: 10px;
	`,
	round: css`
		border-radius: 50%;
	`,
} as const;
