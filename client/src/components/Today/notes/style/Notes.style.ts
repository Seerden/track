import styled from "@emotion/styled";
import { column } from "@/lib/theme/snippets/column";
import { spacing } from "@/lib/theme/snippets/spacing";
import Today from "../../style/Today.style";

const NotesWrapper = styled.section`
	${column};
`;

const Note = styled.li`
	list-style: none;
	display: grid;
	align-items: center;
	grid-template-areas:
		"title tags"
		"content content"
		"content content";

	${Today.Tags} {
		grid-area: tags;
	}

	background-color: ${(p) => p.theme.colors.background.main[4]};
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
	NotesWrapper,
	Note,
	NoteTitle,
	NoteContent,
};
