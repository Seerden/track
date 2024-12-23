import { font } from "@/lib/theme/font";
import { flex } from "@/lib/theme/snippets/flex";
import styled from "styled-components";

const Wrapper = styled.div`
	user-select: none;
	max-width: max-content;
	border-radius: 8px;
	border: 2px solid #ccc;
	font-size: 0.9rem;

	box-shadow:
		0 0.7rem 0 -0.6rem #ccc,
		0 0 0.4rem -0.2rem #777;
`;

const Header = styled.div`
	${flex.row};
	width: 100%;
	gap: 1rem;
	align-items: center;
	padding: 0.4rem 0.5rem;
	margin-bottom: 0.5rem;
	border-bottom: 2px solid #ccc;
	font-size: ${font.size["0.85"]};
	background-color: #ddd;
	border-radius: 5px 5px 0 0;
`;

const MiniItemTemplateList = styled.ul`
	list-style: none;

	${flex.column};

	min-width: max-content;
`;

export default {
	Wrapper,
	Header,
	MiniItemTemplateList
};
