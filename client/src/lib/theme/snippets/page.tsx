import { flex } from "@/lib/theme/snippets/flex";
import shadows from "@/lib/theme/snippets/shadow";
import type { PropsWithChildren } from "react";
import styled, { css } from "styled-components";

export const pageStyle = css`
	background-color: #efefef;
	display: flex;

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

	@media (max-width: 768px) {
		padding: 0;
	}

	/* TODO: this needs to be responsive to the size of the navbar. */
	min-height: calc(100vh - 5.4rem);

	padding-bottom: 2rem;
`;

const StyledPageWrapper = styled.div`
	margin-top: 5.4rem;

	width: calc(100dvw - 17px);
`;

export default function PageWrapper({ children }: PropsWithChildren) {
	return <StyledPageWrapper>{children}</StyledPageWrapper>;
}
