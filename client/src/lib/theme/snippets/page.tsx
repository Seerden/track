import { spacing } from "@/lib/theme/snippets/spacing";
import type { PropsWithChildren } from "react";
import styled, { css } from "styled-components";
import { pageBorder } from "./border";
import { pageShadow } from "./shadow";

export const pageStyle = css`
	background-color: #efefef;
	max-width: 800px;
	display: flex;
	justify-content: center;
	margin: 0 auto;
	${spacing.padding.wide({ size: 1.2, ratio: 1.5 })};

	margin-top: 6rem;
	${pageShadow};

	${pageBorder};
`;

const StyledPageWrapper = styled.div`
	margin-top: 6rem;
`;

export default function PageWrapper({ children }: PropsWithChildren) {
	return <StyledPageWrapper>{children}</StyledPageWrapper>;
}
