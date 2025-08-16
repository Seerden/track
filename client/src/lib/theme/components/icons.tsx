import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { CSSProperties } from "react";
import { outline } from "../snippets/edge";
import { flex } from "../snippets/flex";
import { radius } from "../snippets/radius";

export const Icon = styled.span`
	${flex.centered};
	border-radius: 50%;
`;

// TODO (TRK-75): theme values
const Shortcut = styled.span`
	font-size: 0.8rem;
	color: #333;
	font-weight: 500;
	text-transform: uppercase;
	padding: 0.2rem 0.5rem;
	background-color: #ddd;
	width: max-content;
	display: inline-flex;
	border-radius: 3px;
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
						color: var(--badge-icon-color);
					}

					outline: 1px solid var(--badge-icon-color);

					background-color: #eee; // TODO: theme value
					box-shadow: 0 0 0.2rem 0 #333;
				`
			: css`
					.lucide {
						color: white;
					}

					${outline.primary}
					background-color: var(--badge-icon-color);
					box-shadow: 0 0 0.3rem 0 #ddd;
				`}
`;

const Icons = {
	InBadge,
	Shortcut
};

export default Icons;
