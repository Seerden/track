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

const customScrollbar = css`
	&::-webkit-scrollbar {
		height: 8px;
	}

	&::-webkit-scrollbar-track-piece {
		background-color: #fff;
	}

	&::-webkit-scrollbar-thumb {
		background-color: dodgerblue;
		outline: 2px solid #fff;
		outline-offset: -2px;
		border: 0.1px solid #b7b7b7;
		border: 4px solid transparent;

		&:hover {
			background-color: royalblue;
		}
	}
`;

const scrollbar = {
	hidden: hiddenScrollbar,
	custom: customScrollbar
};

export default scrollbar;
