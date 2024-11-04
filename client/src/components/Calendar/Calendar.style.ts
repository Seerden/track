import type { CSSProperties } from "styled-components";
import styled, { css } from "styled-components";

const gap = "0.1rem";
const defaultCellWidth = 30;
const defaultCellHeight = 20;
const highlightColor: CSSProperties["color"] = "dodgerblue";

const Calendar = styled.div`
	display: flex;
	flex-direction: column;
	user-select: none;
	width: max-content;
	height: max-content;
	margin-left: 1rem;
	margin-top: 1rem;
	--font-size: 0.9rem;
	font-size: var(--font-size);
	line-height: var(--font-size);
	font-family: "Roboto";
	padding: 1rem;
	border: 2px solid #ddd;
	border-radius: 5px;
	box-shadow:
		1.5rem 1.5rem 0 -1.3rem ${highlightColor},
		0 0 0.5rem 0 #ddd;
`;

const Title = styled.h2`
	font-size: 1.2rem;
	align-self: flex-end;
	color: ${highlightColor};
	margin-bottom: calc(4 * ${gap});
`;

const Days = styled.div`
	display: flex;
	flex-direction: row;
	gap: ${gap};
	width: max-content;
	margin-bottom: calc(4 * ${gap});
	border-radius: 5px;
	background-color: #eee;
	border-bottom: 2px solid ${highlightColor};
	font-weight: 500;
	font-size: 0.8rem;
`;

type StyledCellProps = {
	width?: number;
	height?: number;
	$selected?: boolean;
};

const Day = styled.div<StyledCellProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	width: ${({ width }) => width ?? defaultCellWidth}px;
	height: ${({ height }) => height ?? defaultCellHeight}px;
`;

const Rows = styled.div`
	display: flex;
	flex-direction: column;
	gap: calc(3 * ${gap});
`;

const Row = styled.div`
	display: flex;
	flex-direction: row;
	gap: ${gap};
`;

// Probably prefer doing a Cell and an EmptyCell component instead of this
const cellStyles = {
	empty: css`
		background-color: unset;
		border-radius: none;
		box-shadow: none;
	`,
	nonEmpty: css`
		background-color: #eaeaea;
		border-radius: 3px;
		box-shadow: 0 0.5rem 0 -0.35rem #ddd;
		cursor: pointer;

		&:hover {
			outline: 1px solid ${highlightColor};
		}

		&:active {
			background-color: ${highlightColor};
			color: azure;
			outline: none;
		}
	`,
} as const;

const Cell = styled.button<StyledCellProps>`
	border: none;
	display: flex;
	justify-content: center;
	align-items: center;
	width: ${({ width }) => width ?? defaultCellWidth}px;
	height: ${({ height }) => height ?? defaultCellHeight}px;
	${({ children }) => (children ? cellStyles.nonEmpty : cellStyles.empty)};

	// TODO: add 'selected' styles
	${(p) =>
		p.$selected &&
		css`
			background-color: ${highlightColor};
			color: azure;
			box-shadow: 0 0 0.2rem 0 #ccc;
		`}
`;

Cell.defaultProps = {
	type: "button",
};

export default { Calendar, Title, Days, Day, Cell, Rows, Row };
