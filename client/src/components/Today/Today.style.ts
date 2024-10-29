import styled from "styled-components";
import T from "./Tasks.style";

const Wrapper = styled.div``;

const TimelineWrapper = styled.section`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	padding: 1rem 3rem;
`;

const NotesWrapper = styled.section``;

const BlockTitle = styled.h2`
	width: max-content;
	padding: 0.5rem 1rem;
`;

const Rows = styled.ul`
	display: flex;
	flex-direction: column;
`;

const rowHeight = 40;

const Row = styled.li`
	position: relative;
	display: flex;
	border-top: 2px solid #ddd;
	min-height: ${rowHeight}px;
	width: 100%;
`;

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

const CheckboxWrapper = styled.label`
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

const cardWidth = 175;
const cardGap = 5;

const ActivityCard = styled.div<{ $level: number; $offset: number }>`
	position: absolute;
	top: calc(${(p) => p.$offset * 100}%);
	left: calc(3rem + ${(p) => p.$level * (cardGap + cardWidth)}px);
	font-size: 0.86rem;
	display: flex;
	width: 100%;
	height: max-content;

	${CheckboxWrapper} {
		position: absolute;
		top: 0.2rem;
		right: 0.2rem;
		border-radius: 50%;
		background-color: #eee;
	}
`;

const Activity = styled.div<{ $durationHours: number }>`
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

const ActivityName = styled.span`
	max-width: max-content;
	padding: 0.2rem;
	z-index: 4;
	// ellipsis on overflow
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const Checkbox = styled.input`
	display: block;
	margin-right: 0.5rem;
	width: max-content;
`;

const Columns = styled.div`
	display: grid;

	@media (min-width: 1280px) {
		grid-template-columns: 1fr max-content auto; // TODO: this is still temporary because the whole layout is temporary
	}

	grid-template-columns: 1fr;

	gap: 0.5rem;
`;

const Note = styled.li`
	list-style: none;
	display: grid;
	align-items: center;
	grid-template-areas:
		"title tags"
		"content content"
		"content content";

	${T.Tags} {
		grid-area: tags;
	}

	background-color: #ddd;
	padding: 0.5rem 0rem;
`;

const NoteTitle = styled.h3`
	width: max-content;
	padding: 0.3rem 0.8rem;
	grid-area: title;
`;

const NoteContent = styled.div`
	padding: 0.5rem 1rem;
	grid-area: content;
`;

const AllDayActivity = styled.li`
	user-select: none;
	position: relative;
	list-style: none;
	background-color: #eee;
	padding: 0.2rem 1rem;
	font-size: 0.9rem;
	border-radius: 3px;
	outline: 2px solid dodgerblue;
	box-shadow: 0 0.2rem 0.3rem 0 #aaa;

	display: flex;
	flex-direction: row;
	align-items: center;
	padding-left: 2rem;

	p {
		// this targets the icon, should be an other type of element
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		outline: 2px solid dodgerblue;
		left: -0.5rem;
		border-radius: 50%;
		padding: 0.4rem;
		width: 30px;
		height: 30px;
		background-color: #444;
	}
`;

export default {
	Wrapper,
	TimelineWrapper,
	NotesWrapper,
	BlockTitle,
	Rows,
	Row,
	HourMark,
	ActivityCard,
	Activity,
	ActivityName,
	CheckboxWrapper,
	Checkbox,
	Columns,
	Note,
	NoteTitle,
	NoteContent,
	AllDayActivity,
};
