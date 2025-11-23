import styled from "@emotion/styled";
import { motion } from "motion/react";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import { spacingValue } from "@/lib/theme/snippets/spacing";

const Wrapper = styled(motion.i)`
   ${flex.centered};
   padding: ${spacingValue.small};
   ${radius.medium};
   background-color: ${(p) => p.theme.colors.background.main[2]};
`;

const Svg = styled(motion.svg)`
   fill: none;
   stroke: currentColor;
   stroke-width: 2;
   stroke-linecap: round;
   stroke-linejoin: round;
`;

export default { Wrapper, Svg };
