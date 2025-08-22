import styled from "@emotion/styled";
import ActivityFilterStyle from "@/components/activities/ActivityFilter/style/ActivityFilter.style";
import Containers from "@/lib/theme/components/container.style";
import { flex } from "@/lib/theme/snippets/flex";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import D from "../style/DaySelector.style";

const Container = styled.div`
	padding: ${spacingValue.small};
	width: 100%;
`;

const CheckboxWrapper = styled.label`
	${flex.row};
	gap: 0.5rem;
	max-width: max-content;

	span {
		${flex.centered}
	}
`;

const Column = styled(Containers.Column)`
	${flex.column};
	width: max-content;
	height: 4rem;
	justify-content: space-between;
`;

const Label = styled(ActivityFilterStyle.Label)``;

export default {
	Container,
	CheckboxWrapper,
	Column,
	Label,
	DaySelector: D,
};
