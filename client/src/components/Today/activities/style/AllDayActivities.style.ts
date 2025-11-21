import styled from "@emotion/styled";
import { flex } from "@/lib/theme/snippets/flex";
import { spacingValue } from "@/lib/theme/snippets/spacing";

const AllDayActivityList = styled.ul`
	${flex.row};
	flex-wrap: wrap;

	gap: ${spacingValue.small};
	width: max-content;
	max-width: 100%;
	padding-inline: 3rem;

	justify-content: flex-start;
`;

export default {
	AllDayActivityList,
};
