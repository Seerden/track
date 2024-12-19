import { Action } from "@/lib/theme/components/buttons";
import formAlternateStyle from "@/lib/theme/components/form/form.alternate.style";
import { font } from "@/lib/theme/font";
import { flex } from "@/lib/theme/snippets/flex";
import styled, { css } from "styled-components";

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	margin-top: 1rem; // TODO: this should be padding on the Page component

	${formAlternateStyle.Form} {
		max-width: 100%;
		outline: none;
		border: none;
		box-shadow: none;
	}
`;

const TemplateList = styled.ul`
	list-style: none;
	${flex.row};
	flex-wrap: wrap;
	max-width: 100%;
	font-size: ${font.size["0.8"]};
	padding: 0.5rem;

	align-items: center;
	gap: 1rem;
`;

// TODO: instead of implementing these as ul with li, use a radio button group
const TemplateListItem = styled.li<{ $selected: boolean }>`
	margin: 0;
	cursor: pointer;
	user-select: none;
	width: max-content;
	max-width: 100%;
	flex-grow: 1;

	align-items: center;
	justify-content: center;
	border-radius: 2px;
	padding: 0.5rem 1rem;
	box-shadow: 0 0.6rem 0.1rem -0.4rem #ddd;
	background-color: #f5f5f5;
	${flex.column};

	// text ellipsis
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	display: block;

	border: 2px solid transparent;

	${(p) =>
		p.$selected &&
		css`
			--highlight-color: ${(p) => p.theme.colors.blue.main};
			--background-color: ${(p) => p.theme.colors.blue.secondary};
			background-color: var(--highlight-color);
			color: white;
			border-color: var(--highlight-color);
			box-shadow: 0 0.5rem 0.3rem -0.3rem var(--highlight-color);
			transform: translateY(3px);
			transition: transform 30ms ease-in;
		`}
`;

const Fields = styled.div`
	${flex.column};
	gap: 1rem;

	max-width: 450px;
`;

const ActionButton = styled(Action.Alternative)`
	margin-left: 0;
	color: black;
	background-color: ${(p) => p.theme.colors.theme};

	&:hover,
	&:focus {
		background-color: ${(p) => p.theme.colors.theme};
	}
`;

export default {
	TemplateList,
	TemplateListItem,
	Fields,
	ActionButton,
	Wrapper
};
