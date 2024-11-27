import _commonStyle from "@/components/logbooks/Logbooks/style/_common.style";
import { colors } from "@/lib/theme/colors";
import CardStyle from "@/lib/theme/components/Card.style";
import { flex } from "@/lib/theme/snippets/flex";
import styled from "styled-components";

const Card = styled(CardStyle.Wrapper)`
	${_commonStyle.outline.primary}
	${_commonStyle.border.primary};
	${_commonStyle.listShadow};
	${_commonStyle.margin.small};
	${_commonStyle.radius.small};

	min-width: max-content;
	max-width: max-content;

	background-color: ${_commonStyle.tints.tertiary};

	${flex.column}

	${_commonStyle.padding.medium};
`;

const Title = styled(CardStyle.Title)`
	background-color: ${colors.blue.main};
	font-size: 0.9rem;
	width: 100%;
`;

const LastUpdated = styled(CardStyle.Datetime)``;

export default {
	Card,
	Title,
	LastUpdated
};
