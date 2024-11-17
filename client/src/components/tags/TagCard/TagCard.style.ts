import { getFontSize } from "@/lib/theme/font";
import { spacing } from "@/lib/theme/snippets/spacing";
import styled from "styled-components";

const Tag = styled.div`
	border-radius: 4px;
	${spacing.padding.wide({ size: 0.3, ratio: 2 })};
	background-color: darkorchid;
	color: azure;
	max-width: max-content;
	font-size: ${(p) => getFontSize(p, 0.9)};
	user-select: none; //  TODO: when tags become clickable, this disappears; use a button insted
`;

export default {
	Tag
};
