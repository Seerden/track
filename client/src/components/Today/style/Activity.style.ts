import { rowHeight } from "@/components/Today/style/TimelineRow.style";
import { styled } from "styled-components";
import S from "./Today.style";

const cardWidth = 175;
const cardGap = 5;

const ActivityCard = styled.div<{ $level: number; $offset: number }>`
	position: absolute;
	top: calc(${(p) => p.$offset * 100}%);
	left: calc(3rem + ${(p) => p.$level * (cardGap + cardWidth)}px);
	font-size: 0.86rem;
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

const Activity = styled.div<{ $durationHours: number; $isTask?: boolean }>`
	display: flex;
	position: absolute;
	z-index: 2;
	height: ${(p) => rowHeight * p.$durationHours}px;

	padding: 0.5rem 1rem;
	background-color: ${(p) => (p.$isTask ? "dodgerblue" : "limegreen")};
	align-items: ${(p) => (p.$durationHours > 2 ? "flex-start" : "center")};

	outline: 2px solid #eee;
	width: ${cardWidth}px;
	border-radius: 3px;

	transition: all 35ms ease-in;

	&:hover {
		z-index: 3;
		background-color: ${(p) => (p.$isTask ? "royalblue" : "forestgreen")};
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
