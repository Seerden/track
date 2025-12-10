import styled from "@emotion/styled";
import { motion } from "motion/react";
import { font } from "@/lib/theme/font";
import { lightDark } from "@/lib/theme/light-dark";
import { radius } from "@/lib/theme/snippets/radius";
import { spacingValue } from "@/lib/theme/snippets/spacing";

const HourMark = styled(motion.span)<{ $highlighted?: boolean }>`
   --color: var(--hour-mark-color, ${(p) => (p.$highlighted ? p.theme.colors.light[0] : p.theme.colors.text.main[2])});
   --background-color: var(--hour-mark-background-color, ${(p) => (p.$highlighted ? "red" : lightDark(p, p.theme.colors.light[3], p.theme.colors.dark[2]))});

	display: flex;
	align-self: center;
	position: absolute;

	--size: ${spacingValue.medium};
	line-height: var(--size);
	height: var(--size);
	top: calc(-1 * var(--size) / 2);

	left: -1rem;
	width: max-content;
	user-select: none;

	font-size: ${font.size["0.82"]};;
	${radius.small};
	padding: 0 ${spacingValue.small};

   background-color: var(--background-color);
   color: var(--color);
   outline: 1px solid ${(p) => (p.$highlighted ? p.theme.colors.background.main[0] : lightDark(p, p.theme.colors.light[3], p.theme.colors.dark[2]))};
`;

export default {
	HourMark,
};
