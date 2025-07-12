import { getFontSize } from "@/lib/theme/font";
import { thinOutline } from "@/lib/theme/snippets/edge";
import { radius } from "@/lib/theme/snippets/radius";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const HourMark = styled.span<{ $highlighted?: boolean }>`
	display: flex;
	align-self: center;
	position: absolute;

	--size: ${spacingValue.medium};
	line-height: var(--size);
	height: var(--size);
	top: calc(-1 * var(--size) / 2);

	left: -1rem;
	width: max-content;
	user-select: none;

	font-size: ${(p) => getFontSize(p, 0.75)};
	${radius.small};
	padding: 0 ${spacingValue.small};

	${(p) =>
		p.$highlighted
			? css`
					background-color: red;
					${thinOutline.primary};
					color: white;
				`
			: css`
					background-color: #eee;
					${thinOutline.tertiary};
					color: #222;
				`}
`;

export default {
	HourMark
};
