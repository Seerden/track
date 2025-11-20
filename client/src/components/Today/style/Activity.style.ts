import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { rowHeight } from "@/components/Today/style/TimelineRow.style";
import { colors } from "@/lib/theme/colors";
import { font } from "@/lib/theme/font";
import { lightDark } from "@/lib/theme/light-dark";
import { radius } from "@/lib/theme/snippets/radius";
import { spacing } from "@/lib/theme/snippets/spacing";
import Today from "./Today.style";

const cardWidth = "8vw";
const cardGap = "5px";

const ActivityCard = styled.div<{ $level: number; $offset: number }>`
	position: absolute;
	cursor: pointer;
	user-select: none;
	top: calc(${(p) => p.$offset * 100}%);

	--card-gap: 3px;
	--card-width: 100px;

	@media (min-width: 1440px) {
		--card-gap: ${cardGap};
		--card-width: ${cardWidth};
	}
	left: calc(3rem + ${(p) => p.$level} * (var(--card-gap) + var(--card-width)));
	font-size: ${font.size["0.85"]};
	display: flex;
	width: 100%;
	height: max-content;

	${Today.CheckboxWrapper} {
		position: absolute;
		top: 0.2rem;
		right: 0.2rem;
		${radius.round};
		background-color: ${(p) => p.theme.colors.background.main[3]};
	}
`;

const Activity = styled.div<{
	$durationHours: number;
	$isTask?: boolean;
	$completed?: boolean;
	$isRecurring?: boolean;
}>`
	display: flex;
	position: absolute;
	z-index: 2;

	--row-height: ${rowHeight}px;

	@media (min-height: 1250px) {
		--row-height: 2vh;
	}

	height: calc((var(--row-height) * ${(p) => p.$durationHours}));

	${spacing.padding.wide({ size: 0.5, ratio: 2 })};
	background-color: ${(p) => (p.$isTask ? colors.blue.main : colors.green.secondary)};
	align-items: ${(p) => (p.$durationHours > 2 ? "flex-start" : "center")};
	color: ${(p) => (p.$isTask ? "azure" : "#000")};

	outline: 2px solid ${(p) => lightDark(p, p.theme.colors.light[3], p.theme.colors.dark[2])};
	width: var(--card-width);
	${radius.small};

	transition: all 35ms ease-in;

	${(p) =>
		p.$completed &&
		css`
			opacity: 0.4;

			&:hover {
				opacity: 0.8;
			}
		`}

	&:hover {
		z-index: 3;
		background-color: ${(p) => (p.$isTask ? "royalblue" : p.theme.colors.green.main)};
		color: azure;
	}

	.lucide {
		color: ${(p) => (p.$isTask ? colors.blue.main : colors.green.main)};
	}
`;

const ActivityName = styled.span`
	max-width: max-content;
	padding: 0.2rem;
	z-index: 4;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export default { Activity, ActivityCard, ActivityName };
