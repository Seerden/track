import styled from "@emotion/styled";
import { Icon } from "lucide-react";
import { motion, type Variants } from "motion/react";
import type { MainTheme } from "@/lib/style/theme";
import { font } from "@/lib/theme/font";
import { lightDark } from "@/lib/theme/light-dark";
import { spacingValue } from "@/lib/theme/snippets/spacing";

// TODO: take the stuff that belongs in CreateInlineActivity out of here and put
// it in a separate style file.

export const MotionIcon = motion.create(Icon);

export const featherIconMotionVariants: Variants = {
	initial: { opacity: 0, visibility: "hidden", x: 5 },
	hover: {
		opacity: 1,
		visibility: "visible",
		x: 0,
		transition: {
			delay: 0.2,
		},
	},
	exit: {
		opacity: 0,
		visibility: "visible",
		// x: 10,
		transition: {
			duration: 0.035,
			ease: "easeOut",
		},
	},
};

export const timelineRowMotionVariants = (theme: MainTheme): Variants => ({
	initial: {
		"--hour-mark-color": theme.colors.text.main[2],
		"--hour-mark-background-color": lightDark(
			{ theme },
			theme.colors.light[3],
			theme.colors.dark[2]
		),
		width: "100%",
	},
	active: {
		"--hour-mark-color": theme.colors.text.main[2],
		"--hour-mark-background-color": theme.colors.background.main[2],
		cursor: "pointer",
		zIndex: 300,
		backgroundColor: theme.colors.background.main[2],
		borderRadius: 5,
		height: "110%",
		borderBottom: `2px solid ${theme.colors.blue.main}`,
		// boxShadow: `0 1rem 0 -0.8rem ${theme.colors.blue.secondary}`,
		transition: {
			duration: 0.05,
			ease: "easeOut",
		},
		// width: "80%",
	},
	hover: {
		backgroundColor: "var(--bg-3-2)",
		// width: "80%",
	},
});

export const timelinePopoverMotionVariants = (theme: MainTheme): Variants => ({
	initial: {
		opacity: 1,
		boxShadow: "none",
	},
	active: {
		boxShadow: `0 0.3rem 0 -0.1rem ${theme.colors.blue.main}`,
		backgroundColor: theme.colors.background.main[2],
	},
	exit: {
		x: 20,
		opacity: 0,
	},
});

export const rowHeight = 25;

const Row = styled(motion.li)<{ $collapsed?: boolean }>`
	position: relative;
	display: flex;
	border-top: 2px solid ${(p) => lightDark(p, p.theme.colors.light[3], p.theme.colors.dark[2])};
	width: 100%;

	min-height: max(${rowHeight}px, 2vh);
`;

const InnerRow = styled(motion.div)`
   cursor: pointer;
   display: flex;
   justify-content: flex-end;
   align-items: center;
   position: absolute;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   height: 100%;
   padding-right: ${spacingValue.small};
`;

const Pop = styled(motion.div)`
   position: absolute;
   width: max-content;
   height: max-content;
   top: 0;
   bottom: 0;
   right: 0;
   margin: auto;
   padding: ${spacingValue.small};

   display: flex;
   align-items: center;

   input, .mantine-Input-input { 
      font-size: ${font.size["0.82"]};
      --input-size: ${font.size["1.5"]};
      --input-height: ${font.size["1.5"]};
   }
`;

const FeatherIconWrapper = styled(motion.i)`
   display: flex;
   width: max-content;
   height: max-content;
`;

export default {
	Row,
	InnerRow,
	Pop,
	FeatherIconWrapper,
};
