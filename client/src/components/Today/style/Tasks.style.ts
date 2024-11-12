import { column } from "@/components/Today/style/Today.style";
import ListStyle from "@/lib/theme/components/List.style";
import { getFontSize } from "@/lib/theme/font";
import { flex } from "@/lib/theme/snippets/flex";
import styled from "styled-components";

// TODO: make this shared with Notes for now since they are currently the same
const TasksWrapper = styled.section`
	${column};
	padding: 0 1rem;
`;

const TaskName = styled(ListStyle.ItemName)``;

const Times = styled.div`
	width: max-content;
	${flex.column};
	align-items: flex-end;
	font-size: ${(p) => getFontSize(p, 0.8)};

	color: #555;
`;

const Tasks = styled.ul`
	${flex.column};
	gap: 0.6rem;
	overflow-x: auto;
	padding: 0.5rem;
	max-width: 720px;

	display: grid;
	grid-template-columns: max-content max-content auto 1fr;
`;

const Task = styled(ListStyle.Item)`
	grid-template-columns: subgrid;
	grid-column: 1 / -1;
`;

export default {
	TasksWrapper,
	TaskName,
	Times,
	Tasks,
	Task
};
