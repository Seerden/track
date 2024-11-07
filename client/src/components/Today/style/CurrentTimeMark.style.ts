import type { CSSProperties } from "styled-components";
import styled from "styled-components";

const markColor: CSSProperties["color"] = "orangered";

const Circle = styled.div`
	z-index: 4;
	border-radius: 50%;
	position: absolute;
	right: 0;
	--size: 15px;
	top: calc(50% - var(--size) / 2);
	min-height: var(--size);
	min-width: var(--size);
	background-color: ${markColor};
`;

const CurrentTimeMark = styled.div<{ $offset: number }>`
	--left-offset: 1.5rem;
	margin-left: var(--left-offset);
	position: absolute;
	top: calc(${(p) => p.$offset} * 100%);
	width: calc(100% - var(--left-offset));
	height: 2px;
	display: flex;
	background-color: ${markColor};
`;

export default {
	CurrentTimeMark,
	Circle
};
