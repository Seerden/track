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

		&:hover {
			background-color: royalblue;
		}
	}
`;

const customVerticalScrollbar = css`
	${customScrollbar};

	&::-webkit-scrollbar {
		width: 10px;
	}
	&::-webkit-scrollbar-track-piece {
		background-color: transparent;
	}
	&::-webkit-scrollbar-thumb {
		border-radius: 8px;
	}
`;

const scrollbar = {
	hidden: hiddenScrollbar,
	custom: customScrollbar,
	customVertical: customVerticalScrollbar
};

export default scrollbar;
