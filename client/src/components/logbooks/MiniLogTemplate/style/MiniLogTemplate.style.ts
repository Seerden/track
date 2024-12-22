import { flex } from "@/lib/theme/snippets/flex";
import styled from "styled-components";

const Wrapper = styled.div`
	max-width: 100%;
	width: max-content;

	// dev styles
	border: 2px solid deepskyblue;
	padding: 1rem;
`;

const Header = styled.div`
	${flex.row};
	width: 100%;
	gap: 1rem;
	align-items: center;
`;

const MiniItemTemplateList = styled.ul`
	list-style: none;

	// dev styles
	border: 2px solid red;

	${flex.row};
	flex-wrap: wrap;
`;

export default {
	Wrapper,
	Header,
	MiniItemTemplateList
};
