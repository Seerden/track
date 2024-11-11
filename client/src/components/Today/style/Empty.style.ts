import { spacing } from "@/lib/theme/snippets/spacing";
import styled from "styled-components";

const Empty = styled.p`
	background-color: ${(p) => p.theme.colors.highlight.info};
	color: ${(p) => p.theme.colors.tint.white};
	${spacing.padding.wide({ size: 0.5, ratio: 2 })};
	border-radius: 3px;
	max-width: max-content;
`;

export default {
	Empty
};
