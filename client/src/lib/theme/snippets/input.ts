import { font } from "@/lib/theme/font";
import { noBorders } from "@/lib/theme/snippets/border";
import { spacing } from "@/lib/theme/snippets/spacing";
import { css } from "styled-components";

export const inputStyle = css`
	font-size: ${font.size[0.93]};
	${noBorders};
	${spacing.padding.wide({ size: 0.3, ratio: 1.5 })};
	box-shadow: 0.4rem 0.4rem 0.1rem -0.2rem #ddd;
	border-radius: 3px;
`;
