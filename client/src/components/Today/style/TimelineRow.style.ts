import styled from "@emotion/styled";

export const rowHeight = 25;

const Row = styled.li<{ $collapsed?: boolean }>`
	position: relative;
	display: flex;
	border-top: 2px solid #eee;
	width: 100%;

	min-height: max(${rowHeight}px, 2vh);
`;

export default {
	Row,
};
