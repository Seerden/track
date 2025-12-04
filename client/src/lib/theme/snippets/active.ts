import { css } from "@emotion/react";
import { outline } from "./edge";

/**
 * @deprecated unused for now. Work out something that looks better.
 */
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
