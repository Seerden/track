import styled from "@emotion/styled";
import { motion, type Variants } from "motion/react";
import type { MainTheme } from "@/lib/style/theme";
import { font } from "@/lib/theme/font";
import { spacingValue } from "@/lib/theme/snippets/spacing";

export const timelinePopoverMotionVariants = (theme: MainTheme): Variants => ({
	initial: {
		opacity: 1,
		boxShadow: "none",
		backgroundColor: theme.colors.background.main[0],
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

const Pop = styled(motion.div)`
   /* TODO: this was intended to try to prevent the mobile context menu from
   opening on TimeInput tap, but it doesn't work. */
   user-select: none;
   position: absolute;
   width: max-content;
   height: max-content;
   top: 0;
   bottom: 0;
   right: 0;
   margin: auto;
   padding: ${spacingValue.small};

   display: flex;
   flex-direction: row;
   align-items: center;
   z-index: 300;
   border-radius: 3px;
   font-size: ${font.size["0.85"]};
   outline: 2px solid ${(p) => p.theme.colors.background.main[3]};

   input, .mantine-Input-input { 
      font-size: ${font.size["0.82"]};
      --input-size: 1.5rem;
      --input-height: 1.7rem;
   }
`;

export default {
	Pop,
};
