import type { Variants } from "motion";
import type { MainTheme } from "@/lib/style/theme";

export const timelinePopoverMotionVariants = (theme: MainTheme): Variants => ({
	initial: {
		opacity: 1,
		boxShadow: "none",
	},
	active: {
		boxShadow: `-0.2rem 0.2rem 0 0 ${theme.colors.blue.main}`,
		backgroundColor: theme.colors.background.main[2],
	},
	exit: {
		x: 20,
		opacity: 0,
	},
});
