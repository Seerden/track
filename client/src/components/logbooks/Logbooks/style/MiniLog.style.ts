import { colors } from "@/lib/theme/colors";
import CardStyle from "@/lib/theme/components/Card.style";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import { spacing } from "@/lib/theme/snippets/spacing";
import styled from "styled-components";

const Actions = styled.div`
	position: absolute;
	right: 0;
	top: 0;

	background-color: #ddd;
	border-radius: 50%;
`;

const Card = styled(CardStyle.Wrapper)`
	${flex.column}
	${spacing.margin.small};
	${radius.medium};
	${spacing.padding.medium};

	background-color: ${colors.tint.tertiary};

	min-width: max-content;
	max-width: max-content;

	border: 2px solid #ddd;
	outline: 1px solid #eee;
	box-shadow: 0.4rem 0.4rem 0.3rem -0.2rem #ccc;

	${Actions} {
		display: none;
	}

	&:hover,
	&:focus-within {
		${Actions} {
			display: flex;
		}
	}
`;

const Title = styled(CardStyle.Title)`
	background-color: ${colors.blue.main};
	font-size: 0.9rem;
	padding: 0 0.5rem;
	margin-bottom: 0;
`;

const Header = styled.div`
	${flex.row};
	position: relative;
	align-items: center;
	gap: 1rem;
	justify-content: space-between;
`;

const LastUpdated = styled(CardStyle.Datetime)``;

export default {
	Card,
	Title,
	LastUpdated,
	Header,
	Actions
};
