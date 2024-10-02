import styled from "styled-components";

export const Wrapper = styled.main`
	margin: 1.2rem auto;
	max-width: 720px;
	display: flex;
	flex-direction: column;
	box-shadow:
		1rem 1rem 0.1rem -0.6rem green,
		0 0 0 0.3rem darkseagreen,
		0 0 2rem -0.2rem #333;
	padding: 1rem 3rem;
	border-radius: 5px;
`;

export const Title = styled.h1`
	font-size: 1.5rem;
	background-color: forestgreen;
	width: max-content;
	padding: 0.6rem 2.5rem;
	color: azure;
	border-radius: 3px;
	box-shadow:
		0.2rem 0.5rem 0 -0.3rem azure,
		-0.2rem -0.5rem 0 -0.3rem azure,
		0.6rem 0.6rem 0 0 limegreen,
		-0.6rem -0.6rem 0 0 limegreen;
	align-self: center;
`;

export const Rows = styled.ul`
	display: flex;
	flex-direction: column;
`;

const rowHeight = 50;

export const Row = styled.li`
	position: relative;
	display: flex;
	border-top: 2px solid #ddd;
	min-height: ${rowHeight}px;
`;

export const HourMark = styled.span`
	display: flex;
	align-self: center;
	position: absolute;
	line-height: 1.5rem;
	height: 1.5rem;
	top: -0.75rem; // TODO: this has to be such that the text is centered right in between two rows
	left: -1rem;
	background-color: #ccc;
	width: max-content;
	padding: 0 0.5rem;
`;

export const ActivityCard = styled.div<{ $level: number; $offset: number }>`
	position: absolute;
	top: calc(${(p) => p.$offset * 100}%);
	left: calc(3rem + ${(p) => p.$level * 5}rem);
	display: flex;
	width: 100%;
	height: max-content;
`;
export const Activity = styled.div<{ $durationHours: number }>`
	display: flex;
	position: absolute;
	z-index: 2;
	height: ${(p) => rowHeight * p.$durationHours}px;

	padding: 0.5rem 1rem;
	background-color: limegreen;
	align-items: ${(p) => (p.$durationHours > 2 ? "flex-start" : "center")};

	outline: 2px solid #eee;
	--width: 75px;
	width: var(--width);
	border-radius: 3px;

	transition: all 35ms ease-in;

	&:hover {
		z-index: 3;
		background-color: green;
		color: azure;
	}
`;
