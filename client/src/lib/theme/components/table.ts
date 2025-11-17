import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { outline } from "@/lib/theme/snippets/edge";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import { spacing, spacingValue } from "@/lib/theme/snippets/spacing";
import { subgridItem } from "@/lib/theme/snippets/subgrid";

// shared styles between the items and the header -- see TableItem.style (needs
// to be moved to lib/theme)
export const itemAndHeaderFieldStyle = css`
	${spacing.padding.wide({ size: 0.5, ratio: 2 })}

	@media (max-width: 768px) {
		${spacing.padding.wide({ size: 0.2, ratio: 1 })}
	}
`;

const HeaderDark = styled.div`
	position: sticky;
	top: 0;

	margin: ${spacingValue.small} 0;
	padding: ${spacingValue.small} 0;
	${radius.small}

	background-color: #333;
	${outline.tertiary};
	box-shadow: 0 0 0.3rem 0 #ccc;
	color: ${(p) => p.theme.colors.text.contrast[3]};

	${subgridItem};
`;

const HeaderDarkField = styled.div`
	text-align: start;

	${itemAndHeaderFieldStyle};

	@media (max-width: 768px) {
		width: max-content;
	}
`;

const Cell = styled.div<{ centered?: boolean }>`
	${itemAndHeaderFieldStyle}

	${flex.row};
	align-items: center;
	justify-content: ${(p) => (p.centered ? "center" : "flex-start")};

	&:nth-of-type(1) {
		padding-left: ${spacingValue.medium};
	}
	&:nth-last-of-type(1) {
		padding-right: ${spacingValue.medium};
	}
`;

const Table = {
	Header: {
		Dark: {
			Wrapper: HeaderDark,
			Field: HeaderDarkField,
		},
	},
	Cell,
};

export default Table;
