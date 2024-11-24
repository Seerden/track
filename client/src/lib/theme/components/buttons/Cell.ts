import ButtonStyle from "@/lib/theme/components/Button.style";
import type { CSSProperties } from "styled-components";
import styled, { css } from "styled-components";

const highlightColor: CSSProperties["color"] = "dodgerblue";
export const defaultCellWidth = 25;
export const defaultCellHeight = 25;

const Default = styled(ButtonStyle.Unstyled)<{
	$selected?: boolean;
	width?: number;
	height?: number;
}>`
	display: flex;
	justify-content: center;
	align-items: center;

	width: ${(p) => p.width}px;
	height: ${(p) => p.height}px;

	${(p) =>
		// a 'null' cell has no children, so this is nicer than using something like
		// an EmptyCell, keeps the JSX cleaner.
		p.children
			? css`
					background-color: #eaeaea;
					border-radius: 50%;
					box-shadow: 0 0 0.2rem 0 #ccc;
					cursor: pointer;

					&:hover {
						outline: 1px solid ${highlightColor};
					}

					&:active {
						background-color: ${highlightColor};
						color: azure;
						outline: none;
					}
				`
			: css`
					background-color: unset;
					border-radius: none;
					box-shadow: none;
				`}

	${(p) =>
		p.$selected &&
		css`
			background-color: ${highlightColor};
			color: azure;
			box-shadow: 0 0 0.2rem 0 #ccc;
		`}
`;

Default.defaultProps = {
	type: "button",
	width: defaultCellWidth,
	height: defaultCellHeight
};

// move this to Calendar.style when done
export default {
	Default
};
