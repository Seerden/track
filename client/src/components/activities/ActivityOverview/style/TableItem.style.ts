import styled from "styled-components";

const TableItem = styled.tr<{ $isTask: boolean }>`
	border: 2px solid orange;
`;

const Column = styled.td`
	text-align: start;
`;

export default {
	TableItem,
	Column
};
