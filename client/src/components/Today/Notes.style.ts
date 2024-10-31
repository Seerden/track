import styled from "styled-components";
import T from "./Tasks.style";

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

export default {
	Note,
	NoteTitle,
	NoteContent,
};
