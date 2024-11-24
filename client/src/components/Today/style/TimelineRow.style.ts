import styled from "styled-components";

export const rowHeight = 25;

const Row = styled.li<{ $collapsed?: boolean }>`
	position: relative;
	display: flex;
	border-top: 2px solid #e1e1e1;
	width: 100%;

	min-height: max(${rowHeight}px, 2vh);
`;

export default {
	Row
};
