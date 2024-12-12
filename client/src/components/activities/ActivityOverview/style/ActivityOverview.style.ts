import { columnStyle } from "@/components/activities/ActivityOverview/style/TableItem.style";
import styled from "styled-components";

const Wrapper = styled.div``;

const Table = styled.table`
	border-collapse: separate;
	border-spacing: 1rem;
`;

const TableHeader = styled.thead``;

const TableHeaderField = styled.th`
	text-align: start;
	${columnStyle}
`;
export default { Wrapper, Table, TableHeader, TableHeaderField };
