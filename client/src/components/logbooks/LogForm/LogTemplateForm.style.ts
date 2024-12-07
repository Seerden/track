import { font } from "@/lib/theme/font";
import styled from "styled-components";

const itemOffset = "0.5rem";

const SelectionList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 1rem;

	outline: 3px solid white;
	padding: 1rem;
	border-radius: 3px;
	box-shadow: 0 0.2rem 0.5rem 0 #ccc;

	ul {
		padding: 1rem 2rem;
		margin-left: ${itemOffset};
		background-color: #e9e9e9;
		border: 2px solid #ccc;
		border-radius: 6px;
	}
`;

// TODO: make this a shared component. Check similarities with TagSelector
// action bar and maybe use the same component for both.
const ActionBar = styled.div`
	display: flex;
	margin-left: auto;
	flex-direction: row;
	gap: 0.5rem;
	background-color: #fff;
	width: max-content;
	padding: 0.3rem 1rem;
	justify-content: flex-end;
	border-radius: 12px;
`;

const Badge = styled.div`
	--size: 30px;
	position: absolute;
	user-select: none;
	top: calc(50% - var(--size) / 2);
	height: var(--size);
	width: var(--size);
	background-color: limegreen;
	color: white;
	font-weight: 600;
	display: flex;
	justify-content: center;
	align-items: center;
	left: calc(${itemOffset} - var(--size) / 2);
	border-radius: 50%;
	font-size: 0.9rem;
	border: 2px solid #fff;
	outline: 2px solid limegreen;
`;

const ListDescription = styled.p`
	max-width: 500px;
	font-size: ${font.size["0.9"]};
	padding: 1rem 1.5rem;
	background-color: #fff;
	border-radius: 3px;
`;

export default { SelectionList, ActionBar, Badge, ListDescription };
