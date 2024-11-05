import styled, { css } from "styled-components";
import type { CSS } from "styled-components/dist/types";

export const Button = styled.button<{
	$absolute?: boolean;
	$size?: CSS.Properties["width"];
}>`
	--new-tag-button-size: ${(p) => p.$size ?? "30px"};
	min-width: var(--new-tag-button-size);
	min-height: var(--new-tag-button-size);
	border-radius: 50%;
	justify-content: center;
	align-self: center;
	display: flex;

	align-items: center;
	outline: 1px solid white;
	border: 4px solid transparent;
	box-shadow: 0 0.4rem 0 -0.1rem #ddd;
	/* margin-top: 0.5rem; */
	color: white;

	${(p) =>
		p.$absolute &&
		css`
			position: absolute;
			top: 50%;
			right: -7px;
		`}
	background-color: limegreen;

	transition: all 25ms linear;

	&:hover {
		background-color: forestgreen;
		box-shadow: 0 0.8rem 0 -0.6rem #ddd;
		/* transform: translateX(5px); */
		border-bottom-color: limegreen;
	}
`;

Button.defaultProps = {
	type: "button"
};
