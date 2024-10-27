import { Tag } from "@/components/TagCard/TagCard.style";
import styled from "styled-components";

const TasksWrapper = styled.section`
	border: 2px solid #ccc;
`;

const TaskName = styled.div`
	display: flex;
	width: 200px;
	white-space: normal;
	overflow: hidden;
	text-overflow: ellipsis;
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
`;

const Tasks = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 0.3rem;
	overflow-x: auto;
`;

const Task = styled.li`
	list-style: none;
	box-sizing: border-box;
	font-size: 0.9rem;
	display: grid;
	grid-template-columns: max-content max-content max-content auto;
	gap: 0.5rem;
	border-radius: 2px;
	background-color: #ddd;
	width: 100%;
	padding: 0.5rem 1rem;
	align-items: center;
	max-height: 90px;

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
