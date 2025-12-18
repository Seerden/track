import styled from "@emotion/styled";
import type { CSSProperties } from "react";
import { font } from "@/lib/theme/font";
import { radius } from "@/lib/theme/snippets/radius";
import { spacing } from "@/lib/theme/snippets/spacing";

const Badge = styled.div<{ height?: CSSProperties["height"] }>`
	user-select: none;
	display: flex;
	place-items: center;
	${radius.largish};
	font-size: ${font.size["0.82"]};

	background-color: ${(p) => p.color ?? "var(--bg-5-3)"};
	width: max-content;
	${spacing.padding.wide({ size: 0.2, ratio: 3 })};
	min-height: ${(p) => p.height ?? "auto"};
	outline: 2px solid ${(p) => p.theme.colors.light[1]};
`;

const BadgeStyles = {
	Badge,
};

export default BadgeStyles;
