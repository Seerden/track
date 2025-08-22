import { getFontSize } from "@/lib/theme/font";
import { outline } from "@/lib/theme/snippets/edge";
import { radius } from "@/lib/theme/snippets/radius";
import { spacing } from "@/lib/theme/snippets/spacing";
import styled from "@emotion/styled";
import type { CSSProperties } from "react";

const Badge = styled.div<{ height?: CSSProperties["height"] }>`
	user-select: none;
	display: flex;
	place-items: center;
	${radius.largish};
	font-size: ${(p) => getFontSize(p, 0.82)};

	background-color: ${(p) => p.color ?? "#ccc"};
	width: max-content;
	${spacing.padding.wide({ size: 0.2, ratio: 3 })};
	min-height: ${(p) => p.height ?? "auto"};
	${outline.primary};
`;

const BadgeStyles = {
	Badge,
};

export default BadgeStyles;
