import styled from "@emotion/styled";
import type { CSSProperties } from "react";
import {
	defaultCellHeight,
	defaultCellWidth,
} from "@/lib/theme/components/buttons/Cell";
import { font } from "@/lib/theme/font";
import { lightDark } from "@/lib/theme/light-dark";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import { spacingValue } from "@/lib/theme/snippets/spacing";

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

	background-color: ${(p) => p.theme.colors.background.main[1]};

	--font-size: ${font.size["0.82"]};
	font-size: var(--font-size);
	line-height: var(--font-size);
	font-family: "Roboto";

	padding: ${spacingValue.medium};
	
	${radius.medium};
	margin-left: 1rem;
	margin-top: 0.5rem;
   
   /* NOTE: same as Timeline wrapper */
   outline: 2px solid ${(p) => lightDark(p, p.theme.colors.light[3], p.theme.colors.dark[1])};
	box-shadow: 0 0.2rem 1rem -0.3rem ${(p) =>
		lightDark(p, p.theme.colors.light[5], p.theme.colors.dark[0])};
`;

const TitleWrapper = styled.div`
	${flex.row};
	justify-content: space-between;
	align-items: center;
	width: 100%;

	margin-bottom: 0.2rem;
`;

const Title = styled.h2`
	font-size: ${font.size["1.1"]};
	color: ${highlightColor};
`;

const MonthPickerWrapper = styled.div`
	overflow: hidden;
	position: absolute;
	max-width: 90%;
	left: 5%;
	top: 5%;
	background-color: ${(p) => p.theme.colors.background.main[3]};
	box-shadow: 0 0.5rem 1rem 0 ${(p) => lightDark(p, p.theme.colors.light[6], p.theme.colors.dark[1])};
	${radius.medium};
	
   outline: 2px solid ${(p) => lightDark(p, p.theme.colors.light[5], p.theme.colors.dark[3])};
	z-index: 3;
`;

const Days = styled.div`
	${flex.row};
	width: max-content;

	background-color: ${(p) => p.theme.colors.background.main[3]};
	border-bottom: 2px solid ${highlightColor};

	font-size: ${font.size["0.82"]};;
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
		color: ${(p) => p.theme.colors.text.main[3]};
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
