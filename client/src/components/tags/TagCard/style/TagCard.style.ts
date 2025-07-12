import { getFontSize } from "@/lib/theme/font";
import { radius } from "@/lib/theme/snippets/radius";
import { spacing } from "@/lib/theme/snippets/spacing";
import styled from "@emotion/styled";

const Tag = styled.div`
	${radius.small};
	${spacing.padding.wide({ size: 0.3, ratio: 2 })};

	/* TODO TRK-231: theme values for colors */
	background-color: darkorchid;
	color: azure;

	max-width: max-content;
	font-size: ${(p) => getFontSize(p, 0.9)};
	user-select: none; //  TODO: when tags become clickable, this disappears; use a button insted
`;

export default {
	Tag
};
