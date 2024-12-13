import { font } from "@/lib/theme/font";
import { flex } from "@/lib/theme/snippets/flex";
import styled from "styled-components";

const TemplateList = styled.ul`
	list-style: none;
	${flex.row};
	flex-wrap: wrap;
	max-width: 450px;
	font-size: ${font.size["0.8"]};
	padding: 0.5rem;
`;

const TemplateListItem = styled.li`
	cursor: pointer;
	width: max-content;
	flex: 1;
	align-items: center;
	border-radius: 3px;
	padding: 0.5rem 1rem;
	outline: 2px solid #ddd;
	${flex.column};
`;

export default {
	TemplateList,
	TemplateListItem
};
