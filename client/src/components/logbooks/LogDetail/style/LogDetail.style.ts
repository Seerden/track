import { font } from "@/lib/theme/font";
import { flex } from "@/lib/theme/snippets/flex";
import styled from "styled-components";

const Wrapper = styled.div`
	max-width: 800px;

	margin: 2rem;
	border: 3px solid #eee;
	outline: 2px solid dodgerblue;
	box-shadow:
		0 0 0 0.5rem #eee,
		1.5rem 1.5rem 0 0 dodgerblue,
		-2rem -2rem 0 -1rem royalblue,
		0 0 1rem 0 #bbb;
	padding: 2rem 5rem;
	border-radius: 12px;
`;

const LogHeader = styled.h1`
	font-size: ${font.size["2"]};
	margin: 0;
`;

const Sections = styled.div`
	${flex.column};
	gap: 2rem;
`;

export default {
	Wrapper,
	LogHeader,
	Sections
};
