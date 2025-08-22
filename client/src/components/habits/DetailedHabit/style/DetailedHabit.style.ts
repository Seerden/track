import styled from "@emotion/styled";
import CardStyle from "@/lib/theme/components/Card.style";

/** TODO: DetailedHabit is only really shown in a modal, which has some padding etc.
 * of its own, so the style for this is very barebones. If we want to show it
 * outside of a modal, we need some additional styling to make it look better. */
const DetailedHabitCard = styled(CardStyle.Wrapper)`
	max-width: max-content;
	list-style: none;
`;

const InfoFields = styled.section`
	display: grid;
	grid-template-columns: max-content auto;

	width: 100%;

	max-width: max-content;

	${CardStyle.InfoLine} {
		width: 100%;
	}

	margin-bottom: 1rem;
`;

export default {
	DetailedHabitCard,
	InfoFields,
};
