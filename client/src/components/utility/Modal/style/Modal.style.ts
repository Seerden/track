import styled from "@emotion/styled";
import { motion, type Variants } from "motion/react";
import Buttons from "@/lib/theme/components/buttons";
import { lightDark } from "@/lib/theme/light-dark";
import { thinBorder } from "@/lib/theme/snippets/edge";
import { radius } from "@/lib/theme/snippets/radius";
import scrollbar from "@/lib/theme/snippets/scroll";
import { spacing } from "@/lib/theme/snippets/spacing";

export const modalWrapperMotionVariants: Variants = {
	closed: {
		"--blur": "2px",
		"--color-mix-percentage": "2%",
		transition: {
			when: false,
		},
	},
	opened: {
		"--blur": "10px",
		"--color-mix-percentage": "10%",
	},
};

export const modalMotionVariants: Variants = {
	closed: {
		filter: "grayscale(1)",
		y: -20,
		opacity: 0,
		boxShadow: "var(--shadow-closed)",
	},
	opened: {
		filter: "grayscale(0)",
		y: 0,
		opacity: 1,
		boxShadow: "var(--shadow-opened)",
	},
	exit: {
		filter: "grayscale(1)",
		y: 20,
		opacity: 0,
		boxShadow: "var(--shadow-closed)",
	},
};

const ModalWrapper = styled(motion.div)`
   /* NODE: modalWrapperMotionVariants depend on these. */
	--modal-offset: 5vh;
   --blur: 10px;
   --color-mix-percentage: 2%;

	@media (min-height: 1080px) {
		--modal-offset: 15vh;
	}
	@media (min-height: 1440px) {
		--modal-offset: 20vh;
	}

	overflow: hidden;
   /* TODO: should put these indexes somewhere so we can reason about them */
	z-index: 100; 
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
   background-color: color-mix(in srgb,rgba(32, 32, 32, 0.8), transparent var(--color-mix-percentage));
	backdrop-filter: blur(var(--blur));
	display: flex;
	justify-content: center;
`;

const Close = styled(Buttons.Action.Stylized)`
	position: absolute;
	top: -0.9rem;
	right: 1.8rem;
`;

const Modal = styled(motion.div)`
   /** NOTE: modalMotionVariants depend on these. */
   --shadow-opened: 0.8rem 0.8rem 0.1rem -0.2rem ${(p) => lightDark(p, p.theme.colors.light[4], p.theme.colors.purple.main)},
		1.1rem -0.5rem 0.1rem -0.2rem ${(p) => p.theme.colors.blue.main};

   --shadow-closed: 0.3rem 0.3rem 0.1rem -0.2rem ${(p) => lightDark(p, p.theme.colors.light[4], p.theme.colors.purple.secondary)},
		0.8rem -1.1rem 0.1rem -0.2rem ${(p) => p.theme.colors.blue.main};

	position: relative;
	${spacing.padding.wide({ size: 1.2, ratio: 1.25 })}
	background-color: ${(p) => lightDark(p, p.theme.colors.background.main[3], p.theme.colors.dark[2])}; 
	height: max-content;
	${thinBorder.darkish};
	${radius.medium};
	margin-top: var(--modal-offset);
`;

const ModalChildWrapper = styled.div<{ $scrollbarHidden?: boolean }>`
/* I disabled this so that e.g. the TagSelector dropdown stays visible even when
   overflowing. If issues arise because of this, make it an optional prop. */
	/* overflow-y: auto; */
	${(p) => p.$scrollbarHidden && scrollbar.hidden}
	max-height: calc(90vh - var(--modal-offset));
`;

export default { ModalWrapper, Close, Modal, ModalChildWrapper };
