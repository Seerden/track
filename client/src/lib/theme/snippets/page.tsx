import { flex } from "@/lib/theme/snippets/flex";
import shadows from "@/lib/theme/snippets/shadow";
import { spacing } from "@/lib/theme/snippets/spacing";
import type { PropsWithChildren } from "react";
import styled, { css } from "styled-components";

export const pageStyle = css`
	background-color: #efefef;
	display: flex;

	${spacing.padding.wide({ size: 1.2, ratio: 1.5 })};

	${shadows.page};

	${flex.column}
	justify-self: center;
	width: 75dvw;

	border-left: 2px solid #666;
	border-right: 2px solid #666;

	@media (max-width: 768px) {
		width: 100vw;
		border-left: none;
		border-right: none;
	}

	padding: 0 1.5rem;
	min-height: calc(100vh - 5.4rem);
`;

const StyledPageWrapper = styled.div`
	margin-top: 5.4rem;
`;

export default function PageWrapper({ children }: PropsWithChildren) {
	return <StyledPageWrapper>{children}</StyledPageWrapper>;
}
