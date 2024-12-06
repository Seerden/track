import { colors } from "@/lib/theme/colors";
import CardStyle from "@/lib/theme/components/Card.style";
import { border, outline } from "@/lib/theme/snippets/edge";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import shadows from "@/lib/theme/snippets/shadow";
import { spacing } from "@/lib/theme/snippets/spacing";
import styled from "styled-components";

const Card = styled(CardStyle.Wrapper)`
	${flex.column}
	${outline.primary};
	${border.primary};
	${shadows.list};
	${spacing.margin.small};
	${radius.small};
	${spacing.padding.medium};

	background-color: ${colors.tint.tertiary};

	min-width: max-content;
	max-width: max-content;
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
