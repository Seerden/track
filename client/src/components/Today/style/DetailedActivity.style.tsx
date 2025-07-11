import { Action } from "@/lib/theme/components/buttons";
import CardStyle from "@/lib/theme/components/Card.style";
import { flex } from "@/lib/theme/snippets/flex";
import styled from "styled-components";

const Wrapper = styled(CardStyle.Wrapper)`
	display: grid;
	// TODO: this is obsolete I think
	grid-template-areas:
		"title title"
		"time task"
		"time task"
		"tags tags";
`;

const Title = styled(CardStyle.Title)`
	grid-area: title;
`;

const Time = styled.div`
	grid-area: time;

	${flex.column};
	gap: 0.5rem;
`;

const Description = styled.div``;

const HumanizedStart = styled(CardStyle.InfoValue)``;

const Task = styled.div`
	grid-area: task;
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
		border-radius: 50%;
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

const _EditButton = styled(Action.Stylized)`
	position: absolute;
	top: -1rem;
	right: 6rem;
`;

function EditButton(props: Parameters<typeof _EditButton>[0]) {
	return <_EditButton title="Edit this activity" {...props} type="button" />;
}

const StyledDetailedActivity = {
	Wrapper,
	Title,
	Time,
	Description,
	Datetime: CardStyle.Datetime,
	HumanizedStart,
	Tags: CardStyle.Tags,
	Tag: CardStyle.Tag,
	Task,
	CheckboxWrapper,
	EditButton
};

export default StyledDetailedActivity;
