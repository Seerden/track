import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { font } from "@/lib/theme/font";
import { lightDark } from "@/lib/theme/light-dark";
import { radius } from "@/lib/theme/snippets/radius";
import { spacing } from "@/lib/theme/snippets/spacing";

export const itemSizeCss = css`
   max-width: 500px;

   @media (width < 720px) {
      max-width: 100%;
   }
`;

const ItemList = styled.ul`
	gap: 0.6rem; // TODO: theem value;
	overflow-x: visible;
	padding: 0.5rem;

	display: grid;

	outline: 2px solid red;
`;

const Item = styled.li<{ $secondary?: boolean }>`
	user-select: none;
	list-style: none;
	cursor: pointer;
	font-size: ${font.size["0.9"]};;

	display: grid;
	grid-template-columns: subgrid;
	grid-column: 1 / -1;

	gap: 1rem;

	@media (min-width: 1920px) {
		gap: 2rem;
	}

	${radius.medium};
	background-color: ${(p) => (p.$secondary ? "var(--bg-4-1)" : "var(--bg-4-2)")};
	width: 100%;
	min-width: max-content;
	${spacing.padding.wide({ size: 0.5, ratio: 2 })};
	align-items: center;
	max-height: 90px;
	box-shadow: 0.25rem 0.25rem 0.2rem -0.1rem ${(p) => (p.theme.mode === "dark" ? p.theme.colors.dark[2] : p.theme.colors.light[4])};

	${itemSizeCss};
`;

// TODO: I don't like that this is a div
const ItemName = styled.div`
	display: flex;
	white-space: normal;
	overflow: hidden;
	text-overflow: ellipsis;
	text-align: start;

	color: ${(p) => p.theme.colors.text.main[3]};
	background-color: ${(p) => p.theme.colors.background.main[3]};
	${spacing.padding.wide({ size: 0.3, ratio: 2.5 })};
	${radius.small};
	box-shadow: 0 0.1rem 0.2rem 0 ${(p) => lightDark(p, p.theme.colors.light[5], p.theme.colors.dark[2])};

	flex-grow: 1;
`;

const Info = styled.div`
	${spacing.padding.wide({ size: 0.3, ratio: 3 })};
	${radius.small};
	font-size: ${font.size["0.82"]};;
`;

export default {
	ItemList,
	Item,
	ItemName,
	Info,
};
