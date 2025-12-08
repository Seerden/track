import type { Variants } from "motion/react";

/** Slide-in/out animation to be used with page-level elements. */
export const pageVariants: Variants = {
	hidden: {
		opacity: 0,
	},
	appear: {
		opacity: 1,
	},
	exit: {
		opacity: 0,
	},
};
