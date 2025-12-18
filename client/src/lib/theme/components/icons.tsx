import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { CSSProperties } from "react";
import { font } from "../font";
import { flex } from "../snippets/flex";
import { radius } from "../snippets/radius";
import { spacing } from "../snippets/spacing";

export const Icon = styled.span`
	${flex.centered};
	border-radius: 50%;
`;

const Shortcut = styled.span`
	font-size: ${font.size["0.82"]};
	color: #333;
	font-weight: 500;
	text-transform: uppercase;
	${spacing.padding.wide({ size: 0.2, ratio: 2.5 })};
	background-color: ${(p) => p.theme.colors.background.main[4]};
	width: max-content;
	display: inline-flex;
	${radius.small};
	box-shadow: 0 0.2rem 0 -0.1rem #eee;
`;

const InBadge = styled.span<{
	invert?: boolean;
	size?: CSSProperties["width"];
	$color?: CSSProperties["color"];
}>`
	${flex.centered};
	${radius.largish};
	padding: 0.05rem;

	--badge-icon-color: ${(p) => p.$color ?? p.theme.colors.blue.main};
	--size: ${(p) => p.size ?? "22px"};
	width: var(--size);
	height: var(--size);

	${(p) =>
		!p.invert
			? css`
					.lucide {
                  /* TODO: check whether the background color is light, and make
                 this dark if it is. */
						color: ${p.theme.colors.light[0]};
					}

					outline: 1px solid var(--badge-icon-color);

					background-color: var(--badge-icon-color);
					box-shadow: 0 0 0.2rem 0 ${p.theme.colors.dark[3]};
				`
			: css`
					.lucide {
                  /* TODO: check whether the background color is light, and make
                 this dark if it is. */
						color: ${p.theme.colors.light[0]};
					}

					outline: 2px solid ${p.theme.colors.background.main[0]};
					background-color: var(--badge-icon-color);
					box-shadow: 0 0 0.3rem 0 ${p.theme.colors.background.main[4]};
				`}
`;

const Icons = {
	InBadge,
	Shortcut,
};

export default Icons;
