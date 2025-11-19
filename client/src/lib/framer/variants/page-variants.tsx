import type { Variants } from "motion/react";

/** Slide-in/out animation to be used with page-level elements. */
export const pageVariants: Variants = {
	hidden: {
		y: "-100%",
		scaleY: 0,
		opacity: 0,
		originY: 0,
		transition: {
			duration: 2,
			type: "spring",
			stiffness: 200,
		},
	},
	appear: {
		opacity: 1,
		originY: 0,
		scaleY: 1,
		y: 0,
	},
	exit: {
		opacity: 0,
		color: "rgba(0,0,0,0)",
		transition: {
			duration: 0.15,
			type: "spring",
		},
	},
};
