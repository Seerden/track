import styled from "styled-components";

export const Timeline = styled.div`
	margin: 20px;
	position: relative;
`;

export const Body = styled.div`
	border-radius: 2px;
	box-shadow: 0 0 10px 0 #999;
	border: 2px solid #000;
	z-index: 5;
`;

const markOffset = 30;

export const NowMark = styled.div<{ left: number }>`
	z-index: 10;
	position: absolute;
	width: 2px;
	height: calc(100% + ${markOffset}px);
	background-color: red;
	left: ${(p) => p.left}px;
	top: ${-markOffset / 2}px;
`;

export const TimelineEntry = styled.div<{ width: number; color: string; left: number }>`
	position: absolute;
	width: ${(p) => p.width}px;
	height: calc(100% - 4px);
	border: 3px solid red;
	border-color: ${(p) => p.color};
	left: ${(p) => p.left}px;
	top: 2px;
	background-color: ${(p) => p.color};
`;
