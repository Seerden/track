import {
	default as Unstyled,
	default as UnstyledButton,
} from "@/lib/theme/components/buttons/Unstyled";
import { outline, thinOutline } from "@/lib/theme/snippets/edge";
import { radius } from "@/lib/theme/snippets/radius";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { CSSProperties } from "react";
import Active from "../../snippets/active";
import { flex } from "../../snippets/flex";
import { spacing } from "../../snippets/spacing";

const highlightColor: CSSProperties["color"] = "royalblue";
export const defaultCellWidth = 25;
export const defaultCellHeight = 25;

/** This Default Cell is used for Calendar buttons. */
const Default = styled(Unstyled)<{
	$selected?: boolean;
	$highlight?: boolean;
	$width?: number;
	$height?: number;
}>`
	display: flex;
	justify-content: center;
	align-items: center;

	width: ${(p) => p.$width ?? defaultCellWidth}px;
	height: ${(p) => p.$height ?? defaultCellHeight}px;

	${(p) =>
		// a 'null' cell has no children, so this is nicer than using something like
		// an EmptyCell, keeps the JSX cleaner.
		p.children
			? css`
					cursor: pointer;

					background-color: #f9f9f9; // TODO TRK-231: theme value
					${thinOutline.secondary};
					${radius.small};

					&:active {
						background-color: ${highlightColor};
						color: azure; // TODO: TRK-231: theme value
						outline: none;
					}
				`
			: css`
					cursor: default;
					background-color: unset;
					border-radius: 0;
					box-shadow: none;
				`}

	&:focus {
		${outline.tertiary};
	}

	&:hover {
		${(p) =>
			!p.$selected &&
			!!p.children &&
			css`
				transition: all 35ms linear;
				background-color: dodgerblue;
				color: white;
				box-shadow: 0 0 0.3rem 0 #ddd;
			`}
	}

	${(p) =>
		p.$highlight &&
		css`
			background-color: #eee;
			color: #333;
			font-weight: 600;
		`}

	${(p) =>
		p.$selected &&
		css`
			background-color: ${highlightColor};
			color: azure; // TODO TRK-231: theme value
			box-shadow: 0 0 0.2rem 0 #ccc;
		`}
`;

const DaySelector = styled(UnstyledButton)<{ $active?: boolean }>`
	${flex.centered};
	font-size: 0.85rem;

	--cell-size: 22px;
	width: var(--cell-size);
	height: var(--cell-size);
	${spacing.margin.smaller}
	${radius.small};
	background-color: #dfdfdf; // TODO: theme value

	${(p) =>
		p.$active &&
		css`
			background-color: ${p.theme.colors.blue.main};
			color: #fff;
		`}

	${Active.default};
`;

const CellButtons = {
	Default,
	DaySelector,
};

export default CellButtons;
