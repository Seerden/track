import styled from "styled-components";

const Wrapper = styled.li<{
	$scaleX?: number;
	$scaleY?: number;
	$translateX?: number;
	$translateY?: number;
}>`
	display: flex;
	box-sizing: border-box;
	transform: translate3d(${(p) => p.$translateX}, ${(p) => p.$translateY}, 0)
		scaleX(${(p) => p.$scaleX}) scaleY(${(p) => p.$scaleY});
	transform-origin: 0 0;
	touch-action: manipulation;
`;

const Item = styled.div`
	position: relative;
	display: flex;
	flex-grow: 1;
	align-items: center;
	padding: 1.5rem 2rem;
	background-color: #fff;
	box-shadow: 0 0.5rem 0.5rem 0 #ddd;
	outline: none;
	border-radius: calc(4px / var(--scale-x, 1));
	box-sizing: border-box;
	list-style: none;
	transform-origin: 50% 50%;

	-webkit-tap-highlight-color: transparent;

	color: #333;
	font-weight: $font-weight;
	font-size: 1rem;
	white-space: nowrap;

	transform: scale(var(--scale, 1));
	transition: box-shadow 200ms cubic-bezier(0.18, 0.67, 0.6, 1.22);

	&:focus-visible {
		box-shadow:
			0 0px 4px 1px #4c9ffe,
			$box-shadow;
	}

	touch-action: manipulation;
	cursor: grab;
`;

export default {
	Wrapper,
	Item
};
