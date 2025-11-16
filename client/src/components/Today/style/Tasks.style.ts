import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Containers from "@/lib/theme/components/container.style";
import ListStyle from "@/lib/theme/components/List.style";
import { font } from "@/lib/theme/font";
import { column } from "@/lib/theme/snippets/column";
import { flex } from "@/lib/theme/snippets/flex";
import { spacingValue } from "@/lib/theme/snippets/spacing";

// TODO: make this shared with Notes for now since they are currently the same
const TasksWrapper = styled.section`
	${column};
`;

const Times = styled.div`
	width: max-content;
	${flex.column};
	align-items: flex-end;
	font-size: ${font.size["0.82"]};

	color: #555;
`;

const Tasks = styled(Containers.Column)`
	gap: ${spacingValue.medium}; // same as Habits
`;

const Task = styled(ListStyle.Item)<{
	$completed?: boolean;
	overdue?: boolean;
}>`
	cursor: unset;
	max-width: 500px; // same as Habit
	display: grid;
	gap: 1rem;
	grid-template-columns: 30px ${(p) => (p.overdue ? "max-content" : "10ch")} ${(
		p
	) => (p.overdue ? "210px" : "175px")} 1fr;

	${(p) =>
		p.$completed &&
		css`
			opacity: 0.6;
			background-color: #eee;
			outline: 2px solid #e9e9e9; // TODO TRK-231: add this to outline, or use an existing one
		`}// TODO: this opacity is the same for completed tasks in all their implementations, so generalize it.
`;

export default {
	TasksWrapper,
	Times,
	Tasks,
	Task,
};
