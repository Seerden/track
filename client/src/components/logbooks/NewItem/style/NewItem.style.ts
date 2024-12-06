import _commonStyle from "@/components/logbooks/LogDetail/style/_common.style";
import { spacing } from "@/lib/theme/snippets/spacing";
import styled from "styled-components";

const TextHighlight = styled.span`
	background-color: gold;
	color: black;
	box-shadow: 0 1rem 0 -0.75rem goldenrod;

	${spacing.padding.wide({ size: 0.25, ratio: 2 })};
	${_commonStyle.radius.medium}
`;

export default {
	TextHighlight
};
