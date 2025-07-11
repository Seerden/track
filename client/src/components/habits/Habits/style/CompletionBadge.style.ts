import Buttons from "@/lib/theme/components/buttons/buttons";
import styled from "@emotion/styled";

// TODO: do we have any other badges? share styles 🙃
const Badge = styled(Buttons.Unstyled)<{ $size: number; $done?: boolean }>`
	position: relative;
	border-radius: 50%;

	--size: ${(p) => p.$size}px;
	width: var(--size);
	height: var(--size);

	display: flex;
	align-items: center;
	justify-content: center;

	background-color: #fff;

	font-size: 0.9rem;
	font-weight: 700;
	color: ${(p) => (p.$done ? p.theme.colors.green.main : p.theme.colors.red.main)};
`;

export default {
	Badge
};
