import { css } from "@emotion/react";
import { font } from "@/lib/theme/font";
import { noBorders } from "@/lib/theme/snippets/border";
import { radius } from "@/lib/theme/snippets/radius";
import { spacing } from "@/lib/theme/snippets/spacing";

export const inputStyle = css`
	--font-size: ${font.size[0.93]};
	font-size: var(--font-size);

	&:not([type="date"]) {
		line-height: var(--font-size);
	}

	${noBorders};
	${spacing.padding.wide({ size: 0.3, ratio: 1.5 })};
	box-shadow: 0.4rem 0.4rem 0.1rem -0.2rem #ddd;
	${radius.small};
`;
