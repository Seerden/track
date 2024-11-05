import styled from "styled-components";
import type { CSS } from "styled-components/dist/types";

const Badge = styled.div<{ height?: CSS.Properties["height"] }>`
	display: flex;
	place-items: center;
	border-radius: 8px;
	font-size: 0.82rem;

	background-color: ${(p) => p.color ?? "#ccc"};
	width: max-content;
	padding: 0.2rem 0.6rem;
	min-height: ${(p) => p.height ?? "auto"};
	outline: 2px solid azure;
`;

const BadgeStyles = {
	Badge
};

export default BadgeStyles;
