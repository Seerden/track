import styled from "@emotion/styled";
import { motion } from "motion/react";
import { lightDark } from "@/lib/theme/light-dark";

export const rowHeight = 25;

const Row = styled(motion.li)<{ $collapsed?: boolean }>`
	position: relative;
	display: flex;
	border-top: 2px solid ${(p) => lightDark(p, p.theme.colors.light[3], p.theme.colors.dark[2])};
	width: 100%;

	min-height: max(${rowHeight}px, 2vh);
`;

export default {
	Row,
};
