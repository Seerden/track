import { css } from "styled-components";

const flexBase = css`
	display: flex;
`;

const row = css`
	${flexBase};
	flex-direction: row;
`;

const column = css`
	${flexBase};
	flex-direction: column;
`;

export const flex = {
	row,
	column
};
