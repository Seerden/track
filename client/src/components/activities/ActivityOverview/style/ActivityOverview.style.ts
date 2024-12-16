import {
	itemAndHeaderFieldStyle,
	itemAndHeaderStyle
} from "@/components/activities/ActivityOverview/style/TableItem.style";
import styled from "styled-components";

const OverviewWrapper = styled.div`
	width: max-content;
	margin: 5rem;
`;

const Wrapper = styled.div``;

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

export default { OverviewWrapper, Wrapper, Table, Header, HeaderField };
