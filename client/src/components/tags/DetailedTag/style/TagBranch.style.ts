import { font } from "@/lib/theme/font";
import { thinOutline } from "@/lib/theme/snippets/edge";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import { spacing, spacingValue } from "@/lib/theme/snippets/spacing";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const Branch = styled.ol`
	${flex.column};
	position: relative;

	gap: ${spacingValue.small};
	margin-top: 0.4rem; // TODO TRK-231: theme value
	${spacing.padding.wide({ size: 1, ratio: 1.5 })}
	padding-top: 2rem;

	width: max-content;

	background-color: #f2f2f2;
	${radius.medium};
	box-shadow: 0 0.2rem 0.3rem 0 #ccc;
	${thinOutline.primary};
`;

const Node = styled.li<{ $active?: boolean }>`
	list-style: none;
	user-select: none;

	width: max-content;

	font-size: ${font.size["0.8"]};
	${spacing.padding.wide({ size: 0.2, ratio: 2.5 })}
	${radius.small};

	box-shadow:
		0 0.3rem 0.3rem 0 #ddd,
		0 0 0.3rem 0 #aaa;

	${(p) =>
		p.$active &&
		css`
			background-color: ${p.theme.colors.purple.main};
			color: white;
		`}
`;

const Row = styled.menu`
	${flex.row};
	${flex.centered};

	position: relative;
	width: 100%;

	--row-gap: ${spacingValue.small};

	padding: ${spacingValue.small};
	gap: var(--row-gap);
	${radius.small};

	&:not(:only-child):not(:nth-last-of-type(1))::after {
		position: absolute;
		display: block;

		content: "";

		width: 3px;
		height: var(--row-gap);
		bottom: calc(-1 * var(--row-gap));
		left: 50%;
		background-color: #ccc;
	}
`;

const Title = styled.h2`
	position: absolute;
	top: -0.7rem;
	left: -1rem;

	width: max-content;
	font-size: ${font.size["0.9"]};

	${flex.row};
	align-items: center;
	gap: ${spacingValue.small};

	${radius.small};
	${spacing.padding.wide({ size: 0.3, ratio: 4 })}

	// TODO TRK-231: theme value
	background-color: #e1e1e1;
	${thinOutline.primary};
	box-shadow: 0 0.2rem 0.3rem 0 #ccc;
`;

export default {
	Branch,
	Row,
	Node,
	Title,
};
