import { itemSectionStyle } from "@/components/logbooks/LogDetail/style/_shared.style";
import { Action } from "@/lib/theme/components/buttons";
import { font } from "@/lib/theme/font";
import scrollbar from "@/lib/theme/snippets/scroll";
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

	${scrollbar.custom}

	// NOTE: if the padding or margin on any of the containers this is in
   // changes, we have to update the max-width accordingly.
	max-width: calc(
		75dvw - 200px - 14rem
	); /* 200px is the first column, 8rem is about the margin+padding */

	@media (max-width: 768px) {
		max-width: calc(75dvw - 4rem);
	}
`;

const ItemName = styled.h2`
	font-size: ${font.size["1.2"]};
	margin-top: 0.5rem;
	background-color: dodgerblue;
	height: max-content;
	padding: 0.3rem 1rem;
	border-radius: 5px;
	color: white;

	max-width: calc(
		200px - 2rem
	); // matches the width of the subgrid column this is put in on large viewports
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
