import { styled } from "styled-components";

export const Page = styled.section`
	max-width: 750px; // TODO: determine a page-level component width that looks good
	border: 2px solid darkorchid;
	margin: 1.2rem auto;

	padding: 0.5rem 1.5rem;
	box-shadow: 0 0 2rem 0 #ccc;

	// TODO: this is temporary
	h1 {
		margin: 0;
		margin-bottom: 1.5rem;
	}
`;

export const List = styled.ul`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	gap: 0.7rem;
	justify-content: space-between;
`;

export const Note = styled.li`
	list-style: none;

	padding: 0.6rem 0.9rem;
	border: 2px solid darkorchid;
	box-shadow: 0 0 1rem 0 #ccc;
	width: 45%;
`;

export const Title = styled.h2`
	font-size: 1.02rem;
	padding: 0.3rem 0.7rem;
	background-color: #eee;
	border: 2px solid #ccc;
	border-radius: 2px;
	width: max-content;
	margin: -1.2rem 0 0.4rem -0.5rem;
	box-shadow: 0 0 0.2rem 0 #ddd;
`;

export const NoteHeader = styled.span`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

export const Tags = styled.ul`
	display: flex;
	flex-wrap: wrap;
	gap: 0.1rem;
	font-size: 0.75rem;
`;

export const Tag = styled.li`
	border-radius: 3px;
	list-style: none;
	background-color: darkorchid;
	padding: 0.2rem 0.5rem;
	margin-top: -1rem;
	height: max-content;
	color: white;
`;
