import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import { spacing, spacingValue } from "@/lib/theme/snippets/spacing";
import styled, { css } from "styled-components";

// shared styles between the items and the header
export const itemAndHeaderStyle = css`
	display: grid;
	grid-template-columns: subgrid;
	grid-column: 1 / -1;
`;

export const itemAndHeaderFieldStyle = css`
	${spacing.padding.wide({ size: 0.5, ratio: 2 })}

	@media (max-width: 768px) {
		${spacing.padding.wide({ size: 0.2, ratio: 1 })}
	}
`;

const Item = styled.div<{ $isTask: boolean }>`
	${radius.medium};

	outline: 2px solid #f9f9f9;
	background-color: #eee;

	${itemAndHeaderStyle}
`;

const Column = styled.div`
	${itemAndHeaderFieldStyle}
	${flex.row};

	&:nth-of-type(1) {
		padding-left: ${spacingValue.medium};
	}
	&:nth-last-of-type(1) {
		padding-right: ${spacingValue.medium};
	}
`;

export default {
	Item,
	Column
};
