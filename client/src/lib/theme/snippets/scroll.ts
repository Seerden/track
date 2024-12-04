import { css } from "styled-components";

/** Visually hides scrollbar, but keeps the scrollability of the element the way
 * it was. */
const hiddenScrollbar = css`
	&::-webkit-scrollbar {
		display: none;
	}

	scrollbar-width: none;
	-ms-overflow-style: none;
`;

const scrollbar = {
	hidden: hiddenScrollbar
};

export default scrollbar;
