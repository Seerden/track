import ListStyle from "@/lib/theme/components/List.style";
import { getFontSize } from "@/lib/theme/font";
import { column } from "@/lib/theme/snippets/column";
import { flex } from "@/lib/theme/snippets/flex";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

// TODO: make this shared with Notes for now since they are currently the same
const TasksWrapper = styled.section`
	${column};
`;

const TaskName = styled(ListStyle.ItemName)``;

const Times = styled.div`
	width: max-content;
	${flex.column};
	align-items: flex-end;
	font-size: ${(p) => getFontSize(p, 0.8)};

	color: #555;
`;

const Tasks = styled(ListStyle.ItemList)`
	overflow-x: auto;
	grid-template-columns: max-content max-content auto 1fr;
`;

const Task = styled(ListStyle.Item)<{ $completed?: boolean }>`
	${(p) =>
		p.$completed &&
		css`
			opacity: 0.6;
			background-color: #eee;
			outline: 2px solid #e9e9e9;
		`}// TODO: this opacity is the same for completed tasks in all their implementations, so generalize it.
`;

export default {
	TasksWrapper,
	TaskName,
	Times,
	Tasks,
	Task
};
