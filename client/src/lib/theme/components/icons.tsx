import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { CSSProperties } from "react";
import { flex } from "../snippets/flex";
import { radius } from "../snippets/radius";

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

					/* outline: 2px solid var(--badge-icon-color); */
					outline: 2px solid white;
					background-color: var(--badge-icon-color);
					box-shadow: 0 0 0.3rem 0 #ddd;
				`}
`;

const Icons = {
	InBadge
};

export default Icons;
