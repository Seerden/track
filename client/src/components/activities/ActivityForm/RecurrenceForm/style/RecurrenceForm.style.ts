import ActivityFilterStyle from "@/components/activities/ActivityFilter/style/ActivityFilter.style";
import { flex } from "@/lib/theme/snippets/flex";
import styled from "styled-components";

const containerMargin = "0.5rem";

const Container = styled.div`
	margin: ${containerMargin};
	width: calc(100% - 2 * ${containerMargin});
`;

const CheckboxWrapper = styled.label`
	${flex.row};
	gap: 0.5rem;
`;

const RecurrenceWrapper = styled.div`
	${flex.row};
	padding: 1rem;
	gap: 1rem;
	max-width: 100%;
`;

const Column = styled.div`
	${flex.column};
	width: max-content;
	height: 4rem;

	justify-content: space-between;
`;

const IntervalContainer = styled.div`
	${flex.row};
	gap: 0.5rem;
`;

const Label = styled(ActivityFilterStyle.Label)``;

export default {
	Container,
	CheckboxWrapper,
	RecurrenceWrapper,
	Column,
	IntervalContainer,
	Label
};
