import styled from "@emotion/styled";
import { spacing } from "@/lib/theme/snippets/spacing";
import S from "./Today.style";

const Note = styled.li`
	list-style: none;
	display: grid;
	align-items: center;
	grid-template-areas:
		"title tags"
		"content content"
		"content content";

	${S.Tags} {
		grid-area: tags;
	}

	background-color: #ddd;
	padding: 0.5rem 0;
`;

const NoteTitle = styled.h3`
	width: max-content;
	${spacing.padding.wide({ size: 0.3, ratio: 3 })};
	grid-area: title;
`;

const NoteContent = styled.div`
	${spacing.padding.wide({ size: 0.5, ratio: 2 })};
	grid-area: content;
`;

export default {
	Note,
	NoteTitle,
	NoteContent,
};
