import { font } from "@/lib/theme/font";
import { outline } from "@/lib/theme/snippets/edge";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import scrollbar from "@/lib/theme/snippets/scroll";
import shadows from "@/lib/theme/snippets/shadow";
import { spacing, spacingValue } from "@/lib/theme/snippets/spacing";
import styled from "styled-components";

// TODO: copied from Logbooks.style.ts Actions
const Actions = styled.div`
	${flex.row};
	gap: 0.5rem;
	padding: 0.5rem 2rem;

	@media (max-width: 768px) {
		padding: 0.25rem 0.6rem;
	}
	background-color: #eee;
	outline: 2px solid #fff;

	position: absolute;
	right: 0.5rem;
	top: 0;

	border-radius: 3px;
`;

const Title = styled.h3`
	font-size: 1.5rem;
	margin: 0;
	padding-right: 3rem;
	border-bottom: 3px solid #fff;
`;

const Description = styled.p`
	${spacing.margin.small};
	font-size: ${font.size["0.93"]};
	${spacing.padding.wide({ size: 0.5, ratio: 4 })}
	${radius.small};
	${shadows.section}

	background-color: #fff;
	width: max-content;
	max-width: 100%;
`;

const LogList = styled.ul`
	${flex.row};
	gap: ${spacingValue.small};

	overflow-x: auto;

	${scrollbar.custom};
`;

const Card = styled.div`
	box-shadow: 0 0 0.5rem 0 #bbb;
	${outline.primary};
	outline-width: 3px;
	${radius.medium};
	${spacing.padding.medium};

	${Actions} {
		display: none;
	}

	&:hover,
	&:focus-within {
		${Actions} {
			display: flex;
		}
	}

	min-width: 400px;

	&:not(:has(${LogList})) {
		flex-grow: 1;
		max-width: max-content;
	}

	&:has(${LogList}) {
		width: max-content;
		max-width: 50%;
	}

	@media (max-width: 1280px) {
		min-width: 100%;
		width: 100%;
		max-width: 100%;
	}
`;

// TODO: I do want the style, but I don't want it to be imported from FormStyle.
// It should be extracted to a titles snippets file.
const Header = styled.div`
	position: relative;
	${flex.row};
	justify-content: space-between;
	align-items: center;
	padding: 0 0.5rem;
	height: 4rem;
`;

export default { Card, Title, Description, LogList, Header, Actions };
