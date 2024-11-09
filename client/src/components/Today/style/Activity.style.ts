import { rowHeight } from "@/components/Today/style/TimelineRow.style";
import { getFontSize } from "@/lib/theme/font";
import { spacing } from "@/lib/theme/snippets/spacing";
import { css, styled } from "styled-components";
import S from "./Today.style";

const cardWidth = 175;
const cardGap = 5;

const ActivityCard = styled.div<{ $level: number; $offset: number }>`
	position: absolute;
	cursor: pointer;
	user-select: none;
	top: calc(${(p) => p.$offset * 100}%);
	left: calc(3rem + ${(p) => p.$level * (cardGap + cardWidth)}px);
	font-size: ${(p) => getFontSize(p, 0.85)};
	display: flex;
	width: 100%;
	height: max-content;

	${S.CheckboxWrapper} {
		position: absolute;
		top: 0.2rem;
		right: 0.2rem;
		border-radius: 50%;
		background-color: #eee;
	}
`;

const Activity = styled.div<{
	$durationHours: number;
	$isTask?: boolean;
	$completed?: boolean;
}>`
	display: flex;
	position: absolute;
	z-index: 2;
	height: ${(p) => rowHeight * p.$durationHours}px;

	${spacing.padding.wide({ size: 0.5, ratio: 2 })};
	background-color: ${(p) =>
		p.$isTask ? "dodgerblue" : "limegreen"}; // TODO: get these from theme
	align-items: ${(p) => (p.$durationHours > 2 ? "flex-start" : "center")};
	color: ${(p) => (p.$isTask ? "azure" : "black")};

	outline: 2px solid #eee;
	width: ${cardWidth}px;
	border-radius: 3px;

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
