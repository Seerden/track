import styled, { css } from "styled-components";

const HourMark = styled.span<{ $highlighted?: boolean }>`
	--size: 1rem;

	display: flex;
	align-self: center;
	position: absolute;
	line-height: var(--size);
	height: var(--size);
	top: calc(-1 * var(--size) / 2);
	left: -1rem;
	font-size: 0.75rem;
	width: max-content;
	border-radius: 3px;
	padding: 0 0.5rem;
	user-select: none;

	${(p) =>
		p.$highlighted
			? css`
					background-color: red;
					outline: 1px solid white;
					color: white;
				`
			: css`
					background-color: #eee;
					outline: 1px solid #ddd;
					color: #222;
				`}
`;

export default {
	HourMark
};
