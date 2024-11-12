import { getFontSize } from "@/lib/theme/font";
import { spacing } from "@/lib/theme/snippets/spacing";
import styled from "styled-components";

// was Tasks.style -> Task
const Item = styled.li`
	user-select: none;
	list-style: none;
	cursor: pointer;
	box-sizing: border-box;
	font-size: ${(p) => getFontSize(p, 0.9)};
	display: grid;

	grid-template-columns: max-content min-content max-content auto;

	gap: 1rem;

	@media (min-width: 1920px) {
		gap: 2rem;
	}

	border-radius: 3px;
	background-color: #ddd; // TODO: apply some style for completed tasks
	width: 100%;
	min-width: max-content;
	${spacing.padding.wide({ size: 0.5, ratio: 2 })};
	align-items: center;
	max-height: 90px;
	box-shadow: 0.55rem 0.55rem 0.2rem -0.3rem #ccc;

	max-width: 720px; // TODO: this is temporary, but we do want to limit size
`;

// was Tasks.style -> TaskName
// I don't like that this is a div
const ItemName = styled.div`
	display: flex;
	max-width: 200px;
	white-space: normal;
	overflow: hidden;
	text-overflow: ellipsis;

	color: #333;
	background-color: #eee;
	${spacing.padding.wide({ size: 0.3, ratio: 2.5 })};
	border-radius: 4px;
	box-shadow: 0 0.1rem 0.2rem 0 #bbb;
`;

export default {
	Item,
	ItemName
};
