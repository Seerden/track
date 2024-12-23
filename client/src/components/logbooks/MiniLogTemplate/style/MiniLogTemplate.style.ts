import { font } from "@/lib/theme/font";
import { flex } from "@/lib/theme/snippets/flex";
import styled from "styled-components";

// TODO: this should be in border styles
export const border = `1px solid #ccc`;

const Wrapper = styled.div`
	user-select: none;
	max-width: max-content;
	border-radius: 8px;
	border: ${border};
	font-size: 0.9rem;
	background-color: #eee;

	box-shadow:
		0 0.7rem 0 -0.6rem #ccc,
		0 0.2rem 0.6rem -0.3rem #777;
`;

const Header = styled.div`
	${flex.row};
	width: 100%;
	align-items: center;
	padding: 0.3rem 0.6rem;
	border-bottom: ${border};
	font-size: ${font.size["0.85"]};
	background-color: #fff;
	justify-content: space-between;

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
