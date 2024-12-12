import styled, { css } from "styled-components";

export const columnStyle = css`
	/* outline: 2px solid #ccc; */
	padding: 0 0.4rem;
	margin: 0.5rem;
`;

const TableItem = styled.tr<{ $isTask: boolean }>`
	outline: 2px solid #f9f9f9;
	border-radius: 5px;
	/* box-shadow: 0 0.2rem 0.3rem 0 #bbb; */
	background-color: #eee;
`;

const TableItemContent = styled.div``;

const ColumnContent = styled.span`
	display: flex;
	padding: 1rem 0;
`;

const Column = styled.td`
	${columnStyle};
	margin: 2rem;

	&:nth-of-type(1) {
		padding-left: 1rem;
	}
	&:nth-last-of-type(1) {
		padding-right: 1rem;
	}
`;

export default {
	TableItem,
	TableItemContent,
	Column,
	ColumnContent
};
