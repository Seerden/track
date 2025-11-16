import { css } from "@emotion/react";
import { outline } from "./edge";

const defaultActiveStyles = css`
	&:active,
   &:hover,
	&:focus {
		${outline.blue}
	}
`;

const Active = {
	default: defaultActiveStyles,
};

export default Active;
