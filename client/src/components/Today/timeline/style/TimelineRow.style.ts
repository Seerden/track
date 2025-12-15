import styled from "@emotion/styled";
import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import { Icon } from "lucide-react";
import { motion, type Variants } from "motion/react";
import type { MainTheme } from "@/lib/style/theme";
import { lightDark } from "@/lib/theme/light-dark";
import { spacingValue } from "@/lib/theme/snippets/spacing";

extend([namesPlugin]);

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
		// NOTE: this is the same as the background color would be if we left this
		// out, but we need to specify it for the animation to work correctly.
		backgroundColor: theme.colors.background.main[1],
	},
	active: {
		"--hour-mark-color": theme.colors.light[2],
		"--hour-mark-background-color": colord(theme.colors.blue.main).toHex(),
		cursor: "pointer",
		backgroundColor: theme.colors.background.main[2],
		boxShadow: `0 -0.5rem 0 -0.4rem ${theme.colors.blue.main}`,
		// boxShadow: `0 1rem 0 -0.8rem ${theme.colors.blue.secondary}`,
		transition: {
			duration: 0.05,
			ease: "easeOut",
		},
		// width: "80%",
	},
	hover: {
		backgroundColor: "var(--bg-3-2)",
		transition: {
			type: "tween",
		},
		// width: "80%",
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

const FeatherIconWrapper = styled(motion.i)`
   display: flex;
   width: max-content;
   height: max-content;
`;

export default {
	Row,
	InnerRow,
	FeatherIconWrapper,
};
