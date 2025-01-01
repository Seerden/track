import { flex } from "@/lib/theme/snippets/flex";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import styled from "styled-components";
import T, { headerStyle } from "./_shared.style";

const Wrapper = styled.div`
	/* width below is unconventional, but allows for some breathing room next to
	the scrollbar */
	max-width: calc(100% - 34px);
`;

const LogHeader = styled.h1``;

const NewSectionTitle = styled.h2`
	${headerStyle};
	background-color: #fff;
	max-width: 100%;
	width: max-content;
`;

const Sections = styled.div`
	${flex.column};
	gap: 2rem;
`;

const NewSectionWrapper = styled(T.SectionWrapper)`
	${flex.column};
	gap: ${spacingValue.small};
`;

const SectionSelectorWrapper = styled.div`
	${flex.row};
	gap: ${spacingValue.small};
`;

export default {
	Wrapper,
	LogHeader,
	NewSectionTitle,
	Sections,
	NewSectionWrapper,
	SectionSelectorWrapper
};
