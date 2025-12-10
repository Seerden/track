import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { PropsWithChildren } from "react";
import { flex } from "@/lib/theme/snippets/flex";
import { spacingValue } from "@/lib/theme/snippets/spacing";

export const pageStyle = css`
	background-color: var(--bg-3-1);
	display: flex;

	box-shadow: 0.2rem 0.2rem 0.5rem 0 var(--bg-4-1);

	${flex.column}

	max-width: calc(100dvw); // 17px offsets the scrollbar

	@media (min-width: 768px) {
		justify-self: center;
		width: 75dvw;
	}

	border-left: 2px solid #555;
	border-right: 2px solid #555;

	@media (max-width: 768px) {
		width: 100dvw;
		border-left: none;
		border-right: none;
	}

	padding: 0 1.5rem;

	@media (max-width: 768px) {
		padding: 0;
		align-items: center;
	}

	/* TODO: this needs to be responsive to the size of the navbar. */
	min-height: calc(100vh - 5.4rem);

	padding-bottom: 2rem;
`;

const StyledPageWrapper = styled.div`
	margin-top: var(--header-height);
   padding-top: ${spacingValue.small};

	width: calc(100dvw - 17px);
`;

export default function PageWrapper({ children }: PropsWithChildren) {
	return <StyledPageWrapper>{children}</StyledPageWrapper>;
}
