import { getFontSize } from "@/lib/theme/font";
import { spacing } from "@/lib/theme/snippets/spacing";
import styled from "styled-components";
import type { CSS } from "styled-components/dist/types";

const Badge = styled.div<{ height?: CSS.Properties["height"] }>`
	user-select: none;
	display: flex;
	place-items: center;
	border-radius: 8px;
	font-size: ${(p) => getFontSize(p, 0.82)};

	background-color: ${(p) => p.color ?? "#ccc"};
	width: max-content;
	${spacing.padding.wide({ size: 0.2, ratio: 3 })};
	min-height: ${(p) => p.height ?? "auto"};
	outline: 2px solid azure;
`;

const BadgeStyles = {
	Badge
};

export default BadgeStyles;
