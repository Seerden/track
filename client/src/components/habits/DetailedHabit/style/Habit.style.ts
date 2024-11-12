import CardStyle from "@/lib/theme/components/Card.style";
import { flex } from "@/lib/theme/snippets/flex";
import styled from "styled-components";

const HabitCard = styled(CardStyle.Wrapper)`
	margin: auto;
	max-width: max-content;
	list-style: none;

	padding: 2rem;

	border: 2px solid #ddd;
	border-radius: 3px;
	background-color: #eee;
	outline: 2px solid white;

	box-shadow: 0.2rem 0.2rem 0.5rem 0 #ddd;

	// dev
	margin-top: 2rem;
`;

const InfoFields = styled.section`
	${flex.column};

	width: 100%;

	align-items: stretch;
	justify-content: stretch;

	max-width: max-content;

	${CardStyle.InfoLine} {
		width: 100%;
	}

	margin-bottom: 1rem;
`;

export default {
	HabitCard,
	InfoFields
};
