import { getFontSize } from "@/lib/theme/font";
import { flex } from "@/lib/theme/snippets/flex";
import { spacing } from "@/lib/theme/snippets/spacing";
import { styled } from "styled-components";

export const Page = styled.section`
	max-width: 750px; // TODO: determine a page-level component width that looks good
	border: 2px solid darkorchid;
	margin: 1.2rem auto;

	${spacing.padding.wide({ size: 0.5, ratio: 3 })};
	box-shadow: 0 0 2rem 0 #ccc;

	// TODO: this is temporary
	h1 {
		margin: 0;
		margin-bottom: 1.5rem;
	}
`;

export const List = styled.ul`
	${flex.row};
	flex-wrap: wrap;
	justify-content: space-between;
	gap: 0.7rem;
`;

export const Note = styled.li`
	list-style: none;

	${spacing.padding.wide({ size: 0.6, ratio: 1.5 })};
	border: 2px solid darkorchid;
	box-shadow: 0 0 1rem 0 #ccc;
	width: 45%;
`;

export const Title = styled.h2`
	font-size: ${(p) => getFontSize(p, 1.02)};
	${spacing.padding.wide({ size: 0.3, ratio: 2.5 })};
	background-color: #eee;
	border: 2px solid #ccc;
	border-radius: 2px;
	width: max-content;
	margin: -1.2rem 0 0.4rem -0.5rem;
	box-shadow: 0 0 0.2rem 0 #ddd;
`;

export const NoteHeader = styled.span`
	${flex.row};
	justify-content: space-between;
`;

export const Tags = styled.ul`
	display: flex;
	flex-wrap: wrap;
	gap: 0.1rem;
	font-size: ${(p) => getFontSize(p, 0.75)};
`;

export const Tag = styled.li`
	border-radius: 3px;
	list-style: none;
	background-color: darkorchid;
	${spacing.padding.wide({ size: 0.2, ratio: 2.5 })};
	margin-top: -1rem;
	height: max-content;
	color: white;
`;
