import { outline } from "@/lib/theme/snippets/edge";
import { radius } from "@/lib/theme/snippets/radius";
import { spacing, spacingValue } from "@/lib/theme/snippets/spacing";
import styled from "@emotion/styled";

const OverviewWrapper = styled.div`
	width: 100%;
	padding-top: 1rem;
`;

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: max-content 250px repeat(4, auto);

	row-gap: ${spacingValue.small};

	@media (max-width: 1080px) {
		grid-template-columns: min-content auto repeat(4, auto);
	}
`;

const FloatingWrapper = styled.div`
	margin-top: ${spacingValue.medium};
	${spacing.padding.medium};
	${radius.large};
	margin-left: ${spacingValue.small};

	z-index: 2;

	${outline.primary};
	background-color: #fff;
	--highlight: ${(p) => p.theme.colors.darkBlue.main};
	border: 2px solid var(--highlight);
	box-shadow: 0 0 1rem -0.2rem var(--highlight);
`;

export default {
	OverviewWrapper,
	Wrapper,
	FloatingWrapper
};
