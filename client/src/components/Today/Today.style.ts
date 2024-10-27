import { Tag } from "@/components/TagCard/TagCard.style";
import styled from "styled-components";

export const Wrapper = styled.div``;

export const TimelineWrapper = styled.section`
	display: flex;
	flex-direction: column;
	padding: 1rem 3rem;
	border: 2px solid #ccc;
`;

export const TasksWrapper = styled.section`
	border: 2px solid #ccc;
`;

export const NotesWrapper = styled.section`
	border: 2px solid #ccc;
`;

export const BlockTitle = styled.h2`
	width: max-content;
	padding: 0.5rem 1rem;
`;

export const Rows = styled.ul`
	display: flex;
	flex-direction: column;
`;

const rowHeight = 40;

export const Row = styled.li`
	position: relative;
	display: flex;
	border-top: 2px solid #ddd;
	min-height: ${rowHeight}px;
	width: 100%;
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

const cardWidth = 175;
const cardGap = 5;

export const ActivityCard = styled.div<{ $level: number; $offset: number }>`
	position: absolute;
	top: calc(${(p) => p.$offset * 100}%);
	left: calc(3rem + ${(p) => p.$level * (cardGap + cardWidth)}px);
	font-size: 0.86rem;
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
	width: ${cardWidth}px;
	border-radius: 3px;

	transition: all 35ms ease-in;

	&:hover {
		z-index: 3;
		background-color: green;
		color: azure;
	}
`;

export const ActivityName = styled.span`
	max-width: max-content;
	padding: 0.2rem 1rem;
`;

export const Tasks = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 0.3rem;
	overflow-x: auto;
`;

export const Task = styled.li`
	list-style: none;
	box-sizing: border-box;
	font-size: 0.9rem;
	display: grid;
	grid-template-columns: max-content max-content max-content auto;
	gap: 0.5rem;
	border-radius: 2px;
	background-color: #ddd;
	width: 100%;
	padding: 0.5rem 1rem;
	align-items: center;
	max-height: 90px;

	max-width: 720px; // TODO: this is temporary, but we do want to limit size
`;

export const CheckboxWrapper = styled.label`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 27px;
	height: 27px;

	.on {
		fill: forestgreen;
	}

	.off {
		fill: #aaa;
	}
`;

export const Checkbox = styled.input`
	display: block;
	margin-right: 0.5rem;
	width: max-content;
`;

export const Columns = styled.div`
	display: grid;

	@media (min-width: 1920px) {
		grid-template-columns: repeat(3, 1fr);
	}

	grid-template-columns: 1fr;

	gap: 0.5rem;
`;

export const TaskName = styled.div`
	display: flex;
	width: 200px;
	white-space: normal;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export const Times = styled.div`
	width: max-content;
`;

export const Tags = styled.div`
	display: flex;
	justify-content: flex-end;
	flex-wrap: wrap;
	gap: 0.4rem;
	max-width: 250px;
	justify-self: flex-end;
	flex-wrap: wrap;
	overflow-y: hidden;
	max-height: 70px;

	${Tag} {
		display: flex;
		max-height: 30px;
		flex: 1;
		overflow-y: visible;
		white-space: nowrap;
		max-width: 100%;
	}
`;

export const Note = styled.li`
	list-style: none;
	display: grid;
	align-items: center;
	grid-template-areas:
		"title tags"
		"content content"
		"content content";

	${Tags} {
		grid-area: tags;
	}

	background-color: #ddd;
	padding: 0.5rem 0rem;
`;

export const NoteTitle = styled.h3`
	width: max-content;
	padding: 0.3rem 0.8rem;
	grid-area: title;
`;

export const NoteContent = styled.div`
	padding: 0.5rem 1rem;
	grid-area: content;
`;
