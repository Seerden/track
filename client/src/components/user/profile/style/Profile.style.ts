import styled from "@emotion/styled";
import { motion } from "motion/react";
import { menuDropdownStyle } from "@/lib/theme/components/containers/popover.style";

const Menu = styled(motion.div)`
   /* prevents the edges of the header from overflowing */
   overflow-x: hidden;

   ${menuDropdownStyle};
`;

export default {
	Menu,
};
