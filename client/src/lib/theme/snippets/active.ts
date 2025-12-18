import { css } from "@emotion/react";
import { colors } from "@/lib/theme/colors";

/**
 * @deprecated unused for now. Work out something that looks better.
 */
const defaultActiveStyles = css`
	&:active,
   &:hover,
	&:focus {
		outline: 2px solid ${colors.blue.main};
	}
`;

const Active = {
	default: defaultActiveStyles,
};

export default Active;
