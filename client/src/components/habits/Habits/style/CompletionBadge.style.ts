import Buttons from "@/lib/theme/components/buttons/buttons";
import styled from "styled-components";

// TODO: do we have any other badges? share styles 🙃
const Badge = styled(Buttons.Unstyled)<{ $size: number; $done?: boolean }>`
	position: relative;
	border-radius: 50%;

	--size: ${(p) => p.$size}px;
	width: var(--size);
	height: var(--size);

	display: flex;
	align-items: center;
	justify-content: center;

	background-color: #fff;

	font-size: 0.9rem;
	font-weight: 700;
	color: ${(p) => (p.$done ? p.theme.colors.green.main : p.theme.colors.red.main)};
`;
Badge.defaultProps = {
	$size: 30
};

const Svg = styled.svg<{ $size: number; $offset: number }>`
	position: absolute;
	--offset: ${(p) => p.$offset}px;
	top: calc(-1 * var(--offset));
	left: calc(-1 * var(--offset));

	--size: ${(p) => p.$size + 2 * p.$offset}px;
	width: var(--size);
	height: var(--size);
	// this rotation ensures that progess starts from the top of the circle
	transform: rotate(-90deg);
`;

const Circle = styled.circle<{
	$thickness: number;
	$circumference: number;
	$percentage: number;
	$done?: boolean;
	$offset: number;
}>`
	stroke: ${(p) => (p.$done ? p.theme.colors.green.main : p.theme.colors.red.main)};
	stroke-width: ${(p) => p.$thickness + p.$offset}px;
	fill: transparent;
	stroke-dasharray: ${(p) => p.$circumference};
	stroke-dashoffset: ${(p) =>
		p.$circumference - (p.$percentage / 100) * p.$circumference};
	stroke-linecap: ${(p) => (p.$done ? "butt" : "round")};
	transition: stroke-dashoffset 75ms linear;
`;

export default {
	Badge,
	Svg,
	Circle
};
