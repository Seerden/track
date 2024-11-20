import { font } from "@/lib/theme/font";
import { flex } from "@/lib/theme/snippets/flex";
import { spacing } from "@/lib/theme/snippets/spacing";
import styled, { css } from "styled-components";

const Branch = styled.ol`
	position: relative;
	${flex.column};

	gap: 0.5rem;

	margin-top: 0.4rem;

	width: max-content;
	${spacing.padding.wide({ size: 1, ratio: 1.5 })}
	padding-top: 2rem;
	background-color: #f2f2f2;
	border-radius: 5px;
	box-shadow: 0 0.2rem 0.3rem 0 #ccc;
	outline: 1px solid white;
`;

const Node = styled.li<{ $active?: boolean }>`
	user-select: none;
	font-size: ${font.size["0.8"]};
	width: max-content;
	list-style: none;
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
	${flex.row};
	position: relative;
	justify-content: center;
	width: 100%;
	border-radius: 3px;
	padding: 0.5rem;
	gap: 0.5rem;
	align-self: center;
	width: max-content;

	// check if only child
	&:not(:only-child):not(:nth-last-of-type(1))::after {
		content: "";
		display: block;
		clear: both;
		width: 3px;
		height: 0.5rem;
		position: absolute;
		bottom: -0.5rem;
		left: 50%;
		background-color: #ccc;
	}
`;

const Title = styled.h2`
	${flex.row};
	gap: 0.5rem;

	align-items: center;
	position: absolute;
	border-radius: 3px;
	top: -0.7rem;
	left: -1rem;
	font-size: ${font.size["0.9"]};
	width: max-content;
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
