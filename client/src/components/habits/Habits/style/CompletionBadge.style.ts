import styled from "@emotion/styled";
import Buttons from "@/lib/theme/components/buttons";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";

// TODO: do we have any other badges? share styles 🙃
const Badge = styled(Buttons.Unstyled)<{ $size: number; $done?: boolean }>`
	${flex.centered};
	position: relative;

	${radius.round};

	--size: ${(p) => p.$size}px;
	width: var(--size);
	height: var(--size);

	background-color: var(--bg-0-3);

	font-size: ${(p) => p.theme.font.size["0.9"]};
	font-weight: 700;
	color: ${(p) => (p.$done ? p.theme.colors.green.main : p.theme.colors.red.main)};
`;

export default {
	Badge,
};
