import _commonStyle from "@/components/logbooks/LogDetail/style/_common.style";
import { font } from "@/lib/theme/font";
import { flex } from "@/lib/theme/snippets/flex";
import { spacing } from "@/lib/theme/snippets/spacing";
import styled from "styled-components";

const Card = styled.div`
	${flex.column};
	${spacing.padding.wide({ size: 0.3, ratio: 3 })}
	${_commonStyle.radius.medium}
	${_commonStyle.outline.primary};
	${_commonStyle.cardOffsetShadow};

	cursor: pointer; // TODO: this is for when we implement functionality to click a card to edit it
	font-size: ${font.size["0.9"]};
	min-width: max-content;
	color: white;
	background-color: dodgerblue;
	align-items: center;
`;

export default {
	Card
};
