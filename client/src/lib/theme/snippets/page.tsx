import shadows from "@/lib/theme/snippets/shadow";
import { spacing } from "@/lib/theme/snippets/spacing";
import type { PropsWithChildren } from "react";
import styled, { css } from "styled-components";
import { pageBorder } from "./border";

export const pageStyle = css`
	background-color: #efefef;
	max-width: 800px;
	display: flex;
	justify-content: center;
	margin: 0 auto;

	${spacing.padding.wide({ size: 1.2, ratio: 1.5 })};

	${shadows.page};
	${pageBorder};
`;

const StyledPageWrapper = styled.div`
	margin-top: 5.4rem;
`;

export default function PageWrapper({ children }: PropsWithChildren) {
	return <StyledPageWrapper>{children}</StyledPageWrapper>;
}
