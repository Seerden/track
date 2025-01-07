import Buttons from "@/lib/theme/components/buttons/buttons";
import styled from "styled-components";

// TODO: do we have any other badges? share styles 🙃
const Badge = styled(Buttons.Unstyled)<{ $size?: number; $done?: boolean }>`
	position: relative;
	border-radius: 50%;

	--size: ${(p) => p.$size}px;
	width: var(--size);
	height: var(--size);

	display: flex;
	align-items: center;
	justify-content: center;

	background-color: #fff;

	font-weight: 700;
	color: ${(p) => (p.$done ? p.theme.colors.green.main : p.theme.colors.red.main)};

	/* overflow: hidden; */
`;
Badge.defaultProps = {
	$size: 30
};

const Svg = styled.svg`
	position: absolute;
	top: 0;

	// TODO: use size of badge
	width: 30px;
	height: 30px;
	transform: rotate(-90deg); // Rotate to start from the top
`;

const Circle = styled.circle<{
	$thickness?: number;
	$circumference: number;
	$percentage: number;
	$done?: boolean;
}>`
	stroke: ${(p) => (p.$done ? p.theme.colors.green.main : p.theme.colors.red.main)};
	stroke-width: ${({ $thickness: thickness = 2 }) => thickness};
	fill: transparent;
	stroke-dasharray: ${(p) => p.$circumference};
	stroke-dashoffset: ${(p) =>
		p.$circumference - (p.$percentage / 100) * p.$circumference};

	transition: stroke-dashoffset 75ms linear;
`;

export default {
	Badge,
	Svg,
	Circle
};
