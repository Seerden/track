import styled from "styled-components";

export const rowHeight = 40;

const Row = styled.li`
	position: relative;
	display: flex;
	border-top: 2px solid #ddd;
	min-height: ${rowHeight}px;
	width: 100%;
`;

export default {
	Row,
};
