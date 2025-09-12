import styled from "@emotion/styled";
import CardStyle from "@/lib/theme/components/Card.style";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import { spacingValue } from "@/lib/theme/snippets/spacing";

const Wrapper = styled(CardStyle.Wrapper)`
	display: grid;
	// TODO: this is obsolete I think
	grid-template-areas:
		"title recurrence"
		"time task"
		"time task"
		"tags tags";

	grid-row-gap: ${spacingValue.smaller};
	grid-column-gap: ${spacingValue.smaller};
`;

const Title = styled(CardStyle.Title)`
	grid-area: title;
	max-height: max-content;
`;

const Time = styled.div`
	grid-area: time;

	${flex.column};
	gap: ${spacingValue.small};
`;

const Task = styled.div`
	grid-area: task;
`;

const RecurrenceCardContainer = styled(CardStyle.InfoValue)`
	grid-area: recurrence;
	display: flex;
	align-items: center;

	/* this matches that of Title, so that they look better together */
	margin-bottom: 0.5rem;
`;

// TODO: like all the other checkbox usages, this should just be part of the Checkbox component
const CheckboxWrapper = styled.label`
	cursor: pointer;
	input[type="checkbox"] {
		display: none;
	}

	display: flex;
	align-items: center;
	justify-content: center;
	width: 30px;
	height: 30px;

	svg {
		${radius.round};
		background-color: azure;

		/* TODO: use Checked and Unchecked instead of .on and .off */
		&.on {
			fill: ${(p) => p.theme.colors.green.main};
			color: white;
		}

		&.off {
			fill: #fff;
			color: royalblue;
		}
	}
`;

const StyledDetailedActivity = {
	Wrapper,
	Title,
	Time,
	Datetime: CardStyle.Datetime,
	Tags: CardStyle.Tags,
	Tag: CardStyle.Tag,
	Task,
	CheckboxWrapper,
	RecurrenceCardContainer,
};

export default StyledDetailedActivity;
