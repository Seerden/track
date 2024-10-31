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

export const rowHeight = 40;

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
	cursor: pointer;
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

const TimelineHeader = styled.header`
	padding: 1rem 3rem;
	padding-bottom: 0.5rem;

	h1 {
		// this is the element that displays the date
		font-size: 2rem;
		font-weight: 400;
		margin: 0;
	}
`; // is a header the right tag, semantically?

export default {
	Wrapper,
	TimelineWrapper,
	NotesWrapper,
	BlockTitle,
	Rows,
	Row,
	HourMark,
	CheckboxWrapper,
	Checkbox,
	Columns,
	Note,
	NoteTitle,
	NoteContent,
	TimelineHeader,
};
