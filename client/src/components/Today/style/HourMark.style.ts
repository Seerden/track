import styled from "styled-components";

const HourMark = styled.span`
	display: flex;
	align-self: center;
	position: absolute;
	line-height: 1.5rem;
	height: 1.5rem;
	top: -0.75rem; // TODO: this has to be such that the text is centered right in between two rows
	left: -1rem;
	background-color: #eee;
	outline: 1px solid #333;
	font-size: 0.75rem;
	color: #222;
	width: max-content;
	border-radius: 3px;
	padding: 0 0.5rem;
	user-select: none;
`;

export default {
	HourMark
};
