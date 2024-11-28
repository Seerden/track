import { font } from "@/lib/theme/font";
import { flex } from "@/lib/theme/snippets/flex";
import styled from "styled-components";

const Wrapper = styled.div`
	${flex.row};
	gap: 3rem;

	&:not(&:nth-of-type(1)) {
		margin-top: 0.5rem;
		padding-top: 0.5rem;
		border-top: 3px solid #e5e5e5;
	}

	border-radius: 5px;
	background-color: #eaeaea;
	box-shadow: 0 0.3rem 0.5rem 0 #ddd;
	border: 1px solid #fff;
	padding: 0.5rem 1rem;
	margin: 1rem;
	max-width: 750px; // temporary
`;

const Table = styled.table`
	font-size: ${font.size["0.88"]};
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

export default {
	Wrapper,
	Table,
	ItemName
};
