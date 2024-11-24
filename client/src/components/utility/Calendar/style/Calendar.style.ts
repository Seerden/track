import { defaultCellHeight, defaultCellWidth } from "@/lib/theme/components/buttons/Cell";
import { getFontSize } from "@/lib/theme/font";
import { flex } from "@/lib/theme/snippets/flex";
import type { CSSProperties } from "styled-components";
import styled from "styled-components";

const gap = "0.3rem";
const highlightColor: CSSProperties["color"] = "dodgerblue";

const Calendar = styled.div`
	position: relative;

	${flex.column};

	background-color: #f9f9f9;
	user-select: none;
	width: max-content;
	height: max-content;
	margin-left: 1rem;
	margin-top: 0.5rem;
	--font-size: ${(p) => getFontSize(p, 0.8)};
	font-size: var(--font-size);
	line-height: var(--font-size);
	font-family: "Roboto";
	padding: 1rem;
	border: 1px solid #eee;
	border-radius: 5px;
	box-shadow: 0 0 0.5rem 0 #ddd;
`;

const TitleWrapper = styled.div`
	width: 100%;

	${flex.row};
	justify-content: flex-end;
`;

const Title = styled.h2`
	font-size: ${(p) => getFontSize(p, 1.2)};
	color: ${highlightColor};
	margin-bottom: calc(4 * ${gap});
`;

const MonthPickerWrapper = styled.div`
	position: absolute;
	top: 1rem;
	background-color: #eee;
	box-shadow: 0 0.5rem 1rem 0 #777;
	border-radius: 5px;
	outline: 2px solid #ccc;
	z-index: 3;
`;

const Days = styled.div`
	${flex.row};
	gap: ${gap};

	width: max-content;
	margin-bottom: calc(2 * ${gap});
	border-radius: 5px;
	background-color: #eee;
	border-bottom: 2px solid ${highlightColor};

	font-size: ${(p) => getFontSize(p, 0.8)};
	font-weight: 500;

	margin-inline: -0.5rem;
	padding-inline: 0.5rem;
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
	${flex.column};
	gap: calc(1.5 * ${gap});
`;

const Row = styled.div`
	${flex.row};
	gap: ${gap};
`;

export default {
	Calendar,
	TitleWrapper,
	Title,
	MonthPickerWrapper,
	Days,
	Day,
	Rows,
	Row
};
