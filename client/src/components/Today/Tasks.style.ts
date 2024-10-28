import { Tag } from "@/components/TagCard/TagCard.style";
import styled from "styled-components";

const TasksWrapper = styled.section``;

const TaskName = styled.div`
	display: flex;
	max-width: 200px;
	white-space: normal;
	overflow: hidden;
	text-overflow: ellipsis;

	color: #333;
	background-color: #eee;
	padding: 0.4rem 0.7rem;
	border-radius: 4px;
	box-shadow: 0 0.1rem 0.2rem 0 #bbb;
`;

const Tags = styled.div`
	display: flex;
	justify-content: flex-end;
	flex-wrap: wrap;
	gap: 0.4rem;
	max-width: 250px;
	justify-self: flex-end;
	flex-wrap: wrap;
	overflow-y: hidden;
	max-height: 70px;

	${Tag} {
		display: flex;
		max-height: 30px;
		flex: 1;
		overflow-y: visible;
		white-space: nowrap;
		max-width: 100%;
		justify-content: center;
	}
`;

const Times = styled.div`
	width: max-content;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	font-size: 0.8rem;

	color: #555;
`;

const Tasks = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 0.6rem;
	overflow-x: auto;
	margin: 0 0.5rem;
	max-width: 720px;
	height: 100%; // TODO: only apply this when in list/column view?
`;

const Task = styled.li`
	user-select: none;
	list-style: none;
	box-sizing: border-box;
	font-size: 0.9rem;
	display: grid;

	grid-template-columns: max-content min-content max-content auto;

	gap: 1rem;

	@media (min-width: 1920px) {
		gap: 2rem;
	}

	border-radius: 3px;
	background-color: #ddd; // TODO: apply some style for completed tasks
	width: 100%;
	padding: 0.5rem 1rem;
	align-items: center;
	max-height: 90px;
	box-shadow: 0.55rem 0.55rem 0.2rem -0.3rem #ccc;

	max-width: 720px; // TODO: this is temporary, but we do want to limit size
`;

export default {
	TasksWrapper,
	TaskName,
	Tags,
	Times,
	Tasks,
	Task,
};
