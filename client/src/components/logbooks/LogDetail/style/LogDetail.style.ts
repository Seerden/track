import { flex } from "@/lib/theme/snippets/flex";
import styled from "styled-components";
import T, { headerStyle } from "./_shared.style";

const Wrapper = styled.div`
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
	gap: 0.5rem;
`;

const SectionSelectorWrapper = styled.div`
	${flex.row};
	gap: 0.5rem;
`;

export default {
	Wrapper,
	LogHeader,
	NewSectionTitle,
	Sections,
	NewSectionWrapper,
	SectionSelectorWrapper
};
