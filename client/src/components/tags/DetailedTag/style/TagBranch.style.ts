import { font } from "@/lib/theme/font";
import { flex } from "@/lib/theme/snippets/flex";
import { spacing } from "@/lib/theme/snippets/spacing";
import styled, { css } from "styled-components";

const Branch = styled.ol`
	position: relative;

	${flex.column};

	gap: 0.5rem;
	margin-top: 0.4rem;
	${spacing.padding.wide({ size: 1, ratio: 1.5 })}
	padding-top: 2rem;

	width: max-content;

	background-color: #f2f2f2;
	border-radius: 5px;
	box-shadow: 0 0.2rem 0.3rem 0 #ccc;
	outline: 1px solid white;
`;

const Node = styled.li<{ $active?: boolean }>`
	list-style: none;
	user-select: none;

	width: max-content;

	font-size: ${font.size["0.8"]};
	${spacing.padding.wide({ size: 0.2, ratio: 2.5 })}
	border-radius: 3px;

	box-shadow:
		0 0.3rem 0.3rem 0 #ddd,
		0 0 0.3rem 0 #aaa;

	${(p) =>
		p.$active &&
		css`
			background-color: ${(p) => p.theme.colors.purple.main};
			color: white;
		`}
`;

const Row = styled.ul`
	--row-gap: 0.5rem;

	position: relative;
	width: 100%;

	${flex.row};
	justify-content: center;
	padding: 0.5rem;
	gap: var(--row-gap);
	align-self: center;

	border-radius: 3px;

	&:not(:only-child):not(:nth-last-of-type(1))::after {
		position: absolute;
		display: block;

		content: "";

		width: 3px;
		height: var(--row-gap);
		bottom: calc(-1 * var(--row-gap));
		left: 50%;
		background-color: #ccc;
	}
`;

const Title = styled.h2`
	position: absolute;
	top: -0.7rem;
	left: -1rem;

	width: max-content;
	font-size: ${font.size["0.9"]};

	${flex.row};
	gap: 0.5rem;
	align-items: center;

	border-radius: 3px;
	${spacing.padding.wide({ size: 0.3, ratio: 4 })}

	background-color: #e1e1e1;
	outline: 1px solid white;
	box-shadow: 0 0.2rem 0.3rem 0 #ccc;
`;

export default {
	Branch,
	Row,
	Node,
	Title
};
