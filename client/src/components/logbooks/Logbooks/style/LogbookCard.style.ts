import { colors } from "@/lib/theme/colors";
import CardStyle from "@/lib/theme/components/Card.style";
import { font } from "@/lib/theme/font";
import { outline } from "@/lib/theme/snippets/edge";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import shadows from "@/lib/theme/snippets/shadow";
import { spacing } from "@/lib/theme/snippets/spacing";
import styled from "styled-components";

const Card = styled(CardStyle.Wrapper)`
	min-width: 400px;
	max-width: max-content;

	${shadows.card}
	${outline.primary};
	${radius.medium};
	${spacing.padding.medium};
`;

const Title = styled(CardStyle.Title)`
	background-color: ${colors.darkBlue.main}; // TODO: temporary
`;

const Description = styled.p`
	${spacing.margin.medium};
	font-size: ${font.size["0.93"]};
`;

const Logs = styled.div`
	${flex.row}
	${shadows.list}
	${outline.primary};
	${spacing.padding.medium};
	${spacing.margin.medium};
	${radius.large};

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
