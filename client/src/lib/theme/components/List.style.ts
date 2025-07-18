import { getFontSize } from "@/lib/theme/font";
import { radius } from "@/lib/theme/snippets/radius";
import { spacing } from "@/lib/theme/snippets/spacing";
import styled from "@emotion/styled";

const ItemList = styled.ul`
	gap: 0.6rem;
	overflow-x: visible;
	max-width: 720px;
	padding: 0.5rem;

	display: grid;
`;

const Item = styled.li`
	user-select: none;
	list-style: none;
	cursor: pointer;
	font-size: ${(p) => getFontSize(p, 0.9)};

	display: grid;
	grid-template-columns: subgrid;
	grid-column: 1 / -1;

	gap: 1rem;

	@media (min-width: 1920px) {
		gap: 2rem;
	}

	${radius.small};
	background-color: #ddd; // TODO: apply some style for completed tasks
	width: 100%;
	min-width: max-content;
	${spacing.padding.wide({ size: 0.5, ratio: 2 })};
	align-items: center;
	max-height: 90px;
	box-shadow: 0.55rem 0.55rem 0.2rem -0.3rem #ccc;

	max-width: 720px; // TODO: this is temporary, but we do want to limit size
`;

// TODO: I don't like that this is a div
const ItemName = styled.div`
	display: flex;
	/* max-width: 200px; */
	white-space: normal;
	overflow: hidden;
	text-overflow: ellipsis;

	color: #333;
	background-color: #eee;
	${spacing.padding.wide({ size: 0.3, ratio: 2.5 })};
	${radius.small};
	box-shadow: 0 0.1rem 0.2rem 0 #bbb;

	flex-grow: 1;
`;

const Info = styled.div`
	color: #111;
	${spacing.padding.wide({ size: 0.3, ratio: 3 })};
	${radius.small};
	font-size: 0.82rem;
`;

export default {
	ItemList,
	Item,
	ItemName,
	Info
};
