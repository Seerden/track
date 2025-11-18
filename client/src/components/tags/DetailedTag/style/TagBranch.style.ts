import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { contrastColor } from "@/lib/theme/contrast";
import { font } from "@/lib/theme/font";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import { spacing, spacingValue } from "@/lib/theme/snippets/spacing";

const Branch = styled.ol`
	${flex.column};
	position: relative;

	gap: ${spacingValue.small};
	margin-top: 0.4rem; // TODO TRK-231: theme value
	${spacing.padding.wide({ size: 1, ratio: 1.5 })}
	padding-top: 2rem;

	width: max-content;

	background-color: ${(p) => p.theme.colors.background.main[3]};
	${radius.medium};
	box-shadow: 0 0.2rem 0.3rem 0 ${(p) => p.theme.colors.background.main[p.theme.mode === "light" ? 5 : 1]};
	outline: 1px solid ${(p) => p.theme.colors.background.main[p.theme.mode === "light" ? 1 : 2]};
`;

const Node = styled.li<{ $active?: boolean }>`
	list-style: none;
	user-select: none;

	width: max-content;

	font-size: ${font.size["0.9"]};
	${spacing.padding.wide({ size: 0.2, ratio: 2.5 })}
	${radius.small};

	box-shadow:
		0 0.2rem 0.3rem -0.1rem ${(p) => p.theme.colors.background.main[1]};

   background-color: ${(p) => p.theme.colors.background.main[1]};

	${(p) =>
		p.$active &&
		css`
         --bg: ${p.theme.colors.purple.main};
			background-color: var(--bg);
			color: ${contrastColor(p.theme.colors.purple.main)};
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
		background-color: ${(p) => p.theme.colors.background.main[5]};
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

	background-color: ${(p) => p.theme.colors.background.main[1]};
	outline: 1px solid ${(p) => p.theme.colors.background.main[p.theme.mode === "light" ? 1 : 2]};
	box-shadow: 0 0.2rem 0.3rem 0 ${(p) => p.theme.colors.background.main[p.theme.mode === "light" ? 5 : 1]};
`;

export default {
	Branch,
	Row,
	Node,
	Title,
};
