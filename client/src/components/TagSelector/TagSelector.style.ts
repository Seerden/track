import styled, { css } from "styled-components";

export const Wrapper = styled.div<{ $fullSize?: boolean }>`
	position: relative;
	margin-top: 0.8rem;
	border: 2px solid #ccc;
	padding: 0.3rem 0.4rem;
	display: flex;
	flex-direction: column;

	max-width: ${(p) => (p.$fullSize ? "100%" : "400px")};
`;

export const List = styled.ul<{ $oneLine?: boolean }>`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;

	gap: 0.5rem;
	margin-top: 0.3rem;

	border: 3px solid azure;
	/* box-shadow: 0 0 0.5rem 0 #ccc; */
	padding: 0.8rem 1.2rem;

	justify-content: stretch;

	${(p) =>
		// TODO: this is EXTREMELY WIP and does not look good or function comfortably
		// at all
		p.$oneLine &&
		css`
			max-height: 2.4rem;
			overflow-y: scroll;
			justify-content: start;

			padding: 0.2rem;
		`}
`;

export const ListItem = styled.li<{ $hasParent?: boolean; $isSelected?: boolean }>`
	width: max-content;
	border: 2px solid #ccc;
	border-radius: 2px;
	box-shadow: 0.2rem 0.1rem 0 0 #ddd;
	padding: 0.2rem 0.6rem;
	font-size: 0.82rem;

	list-style-type: none;
	cursor: pointer;
	user-select: none;

	&:hover {
		${(p) =>
			!p.$isSelected &&
			css`
				background-color: #eee;
				border-color: deepskyblue;
				box-shadow: 0.3rem 0.3rem 0 -0.1rem deepskyblue;
			`}
	}

	${(props) =>
		!props.$hasParent &&
		css`
			border-color: #bbb;
		`};

	${(props) =>
		props.$isSelected &&
		css`
			border-color: azure;
			background-color: limegreen;
			box-shadow: 0.3rem 0.3rem 0 -0.1rem limegreen;
		`}
`;

export const Title = styled.h3`
	margin: 0;

	padding: 0.35rem 0.75rem;
	margin-top: -1.1rem;
	margin-left: 0.5rem;
	background-color: #333;
	color: azure;
	max-width: max-content;
	font-size: 1.1rem;

	border-radius: 3px;
	border: 2px solid #777;
`;

export const Filter = styled.input`
	display: flex;
	padding: 0.2rem 0.4rem;
	border-radius: 3px;
	border: 2px solid #ccc;
	box-shadow: 0.1rem 0.1rem 0 0 #ddd;
	margin-top: -1rem;
	align-self: flex-end;
	max-width: 150px;

	font-size: 0.88rem;
`;
