import { css } from "styled-components";
import { pageBorder } from "./border";
import { pageShadow } from "./shadow";

export const pageStyle = css`
	background-color: #fdfdfd;
	max-width: 500px;
	margin: 0 auto;
	margin-top: 1rem;
	padding: 1.2rem 1.6rem;

	${pageShadow};

	${pageBorder};
`;
