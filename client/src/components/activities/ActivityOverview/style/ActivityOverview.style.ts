import {
	itemAndHeaderFieldStyle,
	itemAndHeaderStyle
} from "@/components/activities/ActivityOverview/style/TableItem.style";
import { Action } from "@/lib/theme/components/buttons";
import { flex } from "@/lib/theme/snippets/flex";
import styled from "styled-components";

const OverviewWrapper = styled.div`
	width: max-content;
	margin: 5rem;
`;

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: max-content 250px repeat(4, 150px);
`;

const FloatingWrapper = styled.div`
	margin-top: 1rem;
	z-index: 2;
	padding: 1rem;
	border-radius: 12px;
	outline: 2px solid white;
	border: 2px solid royalblue;
	margin-left: 0.5rem;
	box-shadow: 0 0 1rem -0.2rem royalblue;
	background-color: white;
`;

const Table = styled.table`
	border-collapse: separate;
	border-spacing: 1rem;
`;

const Header = styled.div`
	position: sticky;
	top: 0;
	margin: 0.5rem 0;
	background-color: #333;
	border-radius: 3px;
	outline: 2px solid #ccc;
	box-shadow: 0 0 0.3rem 0 #ccc;
	color: #eee;
	padding: 0.5rem 0;

	${itemAndHeaderStyle};
`;

const HeaderField = styled.div`
	text-align: start;

	${itemAndHeaderFieldStyle};
`;

const ActionBar = styled.div`
	${flex.row};
	width: max-content;
	padding: 0.5rem 1rem;
	border-radius: 3px;
	outline: 3px solid #aaa;
	background-color: #eee;
	box-shadow: 0 0.3rem 0.5rem -0.1rem #333;
	gap: 0.5rem;
	margin-bottom: 1rem;

	// Become floating 🎈
	position: sticky;
	z-index: 2;
	top: 1.5rem;
`;

const ActionButton = styled(Action.Alternative)`
	background-color: white;
`;

export default {
	OverviewWrapper,
	Wrapper,
	FloatingWrapper,
	Table,
	Header,
	HeaderField,
	ActionBar,
	ActionButton
};
