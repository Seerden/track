import { itemSectionStyle } from "@/components/logbooks/LogDetail/style/_shared.style";
import { Action } from "@/lib/theme/components/buttons";
import { font } from "@/lib/theme/font";
import { radius } from "@/lib/theme/snippets/radius";
import scrollbar from "@/lib/theme/snippets/scroll";
import { spacing, spacingValue } from "@/lib/theme/snippets/spacing";
import styled from "styled-components";

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: subgrid;
	grid-column: 1 / -1;

	&:not(&:nth-of-type(1)) {
		margin-top: ${spacingValue.small};
		padding-top: ${spacingValue.small};
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
	); /* 200px is the first column, 14rem is ~ margin + padding */

	@media (max-width: 768px) {
		max-width: calc(
			75dvw - 4rem
		); /* like elsewhere, this unconventional width is because of the table */
	}
`;

const ItemName = styled.h2`
	font-size: ${font.size["1.2"]};
	margin-top: ${spacingValue.small};
	background-color: ${(p) => p.theme.colors.blue.main};
	height: max-content;
	${spacing.padding.wide({ size: 0.3, ratio: 3 })}
	${radius.medium};
	color: white;

	max-width: calc(
		200px - 2rem
	); // matches the width of the subgrid column this is put in on large viewports
`;

const Button = styled(Action.Alternative)`
	display: flex;
	-size: 30px;
	color: #000;
	width: var(--size);
	height: var(--size);
	margin-top: ${spacingValue.small};
	margin-left: ${spacingValue.small};
	border-radius: 50%;
`;

export default {
	Wrapper,
	Table,
	TableContent,
	ItemName,
	Button
};
