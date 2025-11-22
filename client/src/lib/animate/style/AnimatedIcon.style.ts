import styled from "@emotion/styled";
import { motion } from "motion/react";
import { spacingValue } from "@/lib/theme/snippets/spacing";

const Wrapper = styled(motion.i)`
   display: flex;
   align-items: center;
   justify-content: center;
   
   padding: ${spacingValue.small};

   border-radius: 5px;;

   background-color: ${(p) => p.theme.colors.background.main[2]};
`;

const Svg = styled(motion.svg)`
`;

export default { Wrapper, Svg };
