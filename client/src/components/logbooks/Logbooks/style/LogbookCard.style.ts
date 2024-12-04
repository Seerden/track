import _commonStyle from "@/components/logbooks/LogDetail/style/_common.style";
import { colors } from "@/lib/theme/colors";
import CardStyle from "@/lib/theme/components/Card.style";
import { font } from "@/lib/theme/font";
import { flex } from "@/lib/theme/snippets/flex";
import styled from "styled-components";

const Card = styled(CardStyle.Wrapper)`
	min-width: 400px;
	max-width: max-content;

	${_commonStyle.cardShadow};
	${_commonStyle.outline.primary};
	${_commonStyle.radius.medium};
	${_commonStyle.padding.medium};
`;

const Title = styled(CardStyle.Title)`
	background-color: ${colors.darkBlue.main}; // TODO: temporary
`;

const Description = styled.p`
	${_commonStyle.margin.medium}
	font-size: ${font.size["0.93"]};
`;

const Logs = styled.div`
	${flex.row}
	${_commonStyle.outline.primary};
	${_commonStyle.listShadow};
	${_commonStyle.padding.medium}
	${_commonStyle.margin.medium}
	${_commonStyle.radius.large};

	align-items: center;

	gap: 1rem;
`;

const LogList = styled.ul`
	${flex.row};

	gap: 1rem;
	padding-right: 1rem;

	max-width: 450px;
	overflow-x: auto;

	border-right: 3px solid #fff;
`;

export default { Card, Title, Description, Logs, LogList };
