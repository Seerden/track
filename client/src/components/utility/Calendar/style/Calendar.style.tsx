import {
	defaultCellHeight,
	defaultCellWidth,
} from "@/lib/theme/components/buttons/Cell";
import { getFontSize } from "@/lib/theme/font";
import { outline, thinBorder } from "@/lib/theme/snippets/edge";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import styled from "@emotion/styled";
import type { CSSProperties } from "react";

// TODO: theme value
const gap = "0.3rem";
// TODO: instead of doing this, define a few them.colors.highlight[order]
// values, and use those. Easier to keep things consistent across the app.
const highlightColor: CSSProperties["color"] = "dodgerblue";

const Calendar = styled.div`
	${flex.column};
	position: relative;
	user-select: none;
	width: max-content;
	height: max-content;

	background-color: #f9f9f9;

	--font-size: ${(p) => getFontSize(p, 0.8)};
	font-size: var(--font-size);
	line-height: var(--font-size);
	font-family: "Roboto";

	padding: ${spacingValue.medium};
	${thinBorder.secondary};
	${radius.medium};
	margin-left: 1rem;
	margin-top: 0.5rem;

	box-shadow: 0 0 0.5rem 0 #ddd;
`;

const TitleWrapper = styled.div`
	${flex.row};
	justify-content: space-between;
	align-items: center;
	width: 100%;

	margin-bottom: 0.2rem;
`;

const Title = styled.h2`
	font-size: ${(p) => getFontSize(p, 1.2)};
	color: ${highlightColor};
`;

const MonthPickerWrapper = styled.div`
	overflow: hidden;
	position: absolute;
	max-width: 90%;
	left: 5%;
	top: 5%;
	background-color: #eee;
	box-shadow: 0 0.5rem 1rem 0 #aaa;
	${radius.medium};
	${outline.grey};
	z-index: 3;
`;

const Days = styled.div`
	${flex.row};
	width: max-content;

	background-color: #eee;
	border-bottom: 2px solid ${highlightColor};

	font-size: ${(p) => getFontSize(p, 0.8)};
	font-weight: 500;

	gap: ${gap};
	${radius.medium};
	margin-bottom: calc(2 * ${gap});
	margin-inline: -0.5rem;
	padding-inline: 0.5rem;
`;

type StyledCellProps = {
	width?: number;
	height?: number;
	$selected?: boolean;
};

const Day = styled.div<StyledCellProps>`
	${flex.centered};
	width: ${({ width }) => width ?? defaultCellWidth}px;
	height: ${({ height }) => height ?? defaultCellHeight}px;
`;

const Rows = styled.div`
	${flex.column};
	gap: calc(1.5 * ${gap});
`;

const Row = styled.div`
	${flex.row};
	gap: ${gap};
`;

const MonthPickerActionWrapper = styled.div`
	${flex.row};
	gap: 0.5rem;

	svg {
		cursor: pointer;
		color: #333;
	}
`;

export default {
	Calendar,
	TitleWrapper,
	Title,
	MonthPickerWrapper,
	Days,
	Day,
	Rows,
	Row,
	MonthPickerActionWrapper,
};
