import styled from "styled-components";

const TableItem = styled.tr<{ $isTask: boolean }>`
	border: 2px solid orange;
`;

export default {
	TableItem
};
