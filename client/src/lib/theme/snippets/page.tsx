import { spacing } from "@/lib/theme/snippets/spacing";
import { css } from "styled-components";
import { pageBorder } from "./border";
import { pageShadow } from "./shadow";

export const pageStyle = css`
	background-color: #efefef;
	max-width: 800px;
	display: flex;
	justify-content: center;
	margin: 0 auto;
	margin-top: 1rem;
	${spacing.padding.wide({ size: 1.2, ratio: 1.5 })};

	${pageShadow};

	${pageBorder};
`;
