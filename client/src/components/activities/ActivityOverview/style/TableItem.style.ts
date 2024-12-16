import { flex } from "@/lib/theme/snippets/flex";
import styled, { css } from "styled-components";

// shared styles between the items and the header
export const itemAndHeaderStyle = css`
	display: grid;
	grid-template-columns: subgrid;
	grid-column: 1 / -1;
`;

export const itemAndHeaderFieldStyle = css`
	padding: 0.5rem 1rem;
`;

const Item = styled.div<{ $isTask: boolean }>`
	outline: 2px solid #f9f9f9;
	border-radius: 5px;
	/* box-shadow: 0 0.2rem 0.3rem 0 #bbb; */
	background-color: #eee;

	${itemAndHeaderStyle}
`;

const Column = styled.div`
	${itemAndHeaderFieldStyle}
	${flex.row};

	&:nth-of-type(1) {
		padding-left: 1rem;
	}
	&:nth-last-of-type(1) {
		padding-right: 1rem;
	}
`;

export default {
	Item,
	Column
};
