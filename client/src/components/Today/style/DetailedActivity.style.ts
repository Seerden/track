import Button from "@/lib/theme/components/Button.style";
import CardStyle from "@/lib/theme/components/Card.style";
import { flex } from "@/lib/theme/snippets/flex";
import styled from "styled-components";

const Wrapper = styled(CardStyle.Wrapper)`
	display: grid;
	// TODO: this is obsolete I think
	grid-template-areas:
		"title edit"
		"time edit"
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

		&.on {
			fill: ${(p) => p.theme.colors.green.main};
			color: white;
		}

		&.off {
			fill: red;
			color: orangered;
		}
	}
`;

const EditButton = styled(Button.Unstyled)`
	cursor: pointer;
	position: absolute;
	top: -1rem;
	right: 5rem;
	grid-area: edit;
	justify-self: flex-end;
	margin-right: 0.8rem;
	width: 35px;
	height: 35px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;

	outline: 2px solid ${(p) => p.theme.colors.blue.main};
	border: 2px solid #eee;
	box-shadow: 0 0.2rem 0.5rem 0 #bbb;
	background-color: ${(p) => p.theme.colors.blue.main};

	svg {
		color: white;
	}

	&:hover {
		outline: 2px solid ${(p) => p.theme.colors.blue.secondary};
		background-color: ${(p) => p.theme.colors.blue.secondary};
		border-radius: 5px;
	}

	transition: all linear 50ms;
`;

EditButton.defaultProps = {
	title: "Edit this activity"
};

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
