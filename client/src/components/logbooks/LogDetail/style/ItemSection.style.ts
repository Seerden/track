import { itemSectionStyle } from "@/components/logbooks/LogDetail/style/_shared.style";
import { Action } from "@/lib/theme/components/buttons";
import { font } from "@/lib/theme/font";
import styled from "styled-components";

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: subgrid;
	grid-column: 1 / -1;

	&:not(&:nth-of-type(1)) {
		margin-top: 0.5rem;
		padding-top: 0.5rem;
	}

	${itemSectionStyle};

	overflow-x: auto;
`;

const Table = styled.div`
	font-size: ${font.size["0.88"]};
`;

const TableContent = styled.div<{ $columns: number }>`
	display: grid;
	grid-template-columns: repeat(${(p) => p.$columns}, max-content);

	overflow-x: auto;
`;

const ItemName = styled.h2`
	font-size: ${font.size["1.2"]};
	margin-top: 0.5rem;
	background-color: dodgerblue;
	height: max-content;
	padding: 0.3rem 1rem;
	border-radius: 5px;
	color: white;
`;

const Button = styled(Action.Alternative)`
	display: flex;
	color: black;
	width: 30px;
	height: 30px;
	margin-top: 0.5rem;
	margin-left: 0.5rem;
	border-radius: 50%;
`;

export default {
	Wrapper,
	Table,
	TableContent,
	ItemName,
	Button
};
