import Unstyled from "@/lib/theme/components/buttons/Unstyled";
import { outline, thinOutline } from "@/lib/theme/snippets/edge";
import { radius } from "@/lib/theme/snippets/radius";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { CSSProperties } from "react";

const highlightColor: CSSProperties["color"] = "royalblue";
export const defaultCellWidth = 25;
export const defaultCellHeight = 25;

const _Default = styled(Unstyled)<{
	$selected?: boolean;
	$highlight?: boolean;
	$width?: number;
	$height?: number;
}>`
	display: flex;
	justify-content: center;
	align-items: center;

	width: ${(p) => p.$width}px;
	height: ${(p) => p.$height}px;

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

function Default(props: Parameters<typeof _Default>[0]) {
	return (
		<_Default
			type="button"
			$width={defaultCellWidth}
			$height={defaultCellHeight}
			{...props}
		/>
	);
}

const CellButtons = {
	Default
};

export default CellButtons;
