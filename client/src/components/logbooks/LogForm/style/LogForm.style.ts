import { Action, Unstyled } from "@/lib/theme/components/buttons";
import formAlternateStyle from "@/lib/theme/components/form/form.alternate.style";
import { font } from "@/lib/theme/font";
import { flex } from "@/lib/theme/snippets/flex";
import styled, { css } from "styled-components";

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	margin-top: 1rem; // TODO: this should be padding on the Page component

	font-size: ${font.size["1"]};

	${formAlternateStyle.Form} {
		max-width: 100%;
		outline: none;
		border: none;
		box-shadow: none;
	}
`;

const TemplateList = styled.div`
	list-style: none;
	${flex.row};
	flex-wrap: wrap;
	max-width: 100%;
	font-size: ${font.size["0.9"]};
	padding: 0.5rem;

	align-items: center;
	gap: 1rem;
`;

// TODO: instead of implementing these as ul with li, use a radio button group
const TemplateListItem = styled(Unstyled)<{ $selected: boolean }>`
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

			&:active,
			&:focus {
				--highlight-color: ${(p) => p.theme.colors.darkBlue.main};
				--background-color: ${(p) => p.theme.colors.darkBlue.secondary};
			}
			background-color: var(--highlight-color);
			color: white;
			border-color: var(--highlight-color);
			--shadow: 0 0.5rem 0.3rem -0.3rem var(--highlight-color);
			box-shadow: var(--shadow);
			transform: translateY(3px);
			transition: transform 30ms ease-in;
		`}

	&:focus {
		${(p) =>
			!p.$selected
				? css`
						outline: 2px solid #ddd;
					`
				: css`
						box-shadow:
							var(--shadow),
							0 0 0.5rem 0 #ddd;
					`}
	}

	&:hover {
		${(p) =>
			!p.$selected &&
			css`
				background-color: #f0f0f0;
			`}
	}
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

// TODO: put this (and the icon below) in form.alternate.style?
const FieldDescription = styled.div`
	margin-top: 0.5rem;

	margin: 1rem 1rem 1rem 3rem;
	@media (max-width: 768px) {
		margin: 0.5rem;
	}
	background-color: #fff;

	font-size: ${font.size["0.9"]};
	color: #333;

	position: relative; // so that we can absolutely position the info icon

	border-radius: 3px;
	box-shadow:
		0.4rem 0.4rem 0 -0.2rem dodgerblue,
		0 0 0.25rem 0rem #ccc;
	outline: 2px solid white;
	border: 1px solid dodgerblue;

	padding: 1rem;
	@media (max-width: 768px) {
		padding: 0.5rem;
		outline: none;
		border: none;
		box-shadow: none;
	}
`;

const FieldDescriptionContent = styled.div`
	line-height: 1rem;
`;

const FieldDescriptionIcon = styled.div`
	display: flex;
	position: absolute;
	left: -0.8rem;
	top: -0.8rem;

	@media (max-width: 768px) {
		display: none;
	}

	max-width: max-content;
	max-height: max-content;

	.lucide {
		color: dodgerblue;
		fill: white;
		stroke-width: 1.5px;
	}
`;

const IconStack = styled.div`
	display: flex;
	position: relative;
	align-items: center;

	.lucide:nth-of-type(2) {
		position: absolute;
		bottom: 0;
		right: -10px;
		background-color: #eee;
		border-radius: 50%;
	}
`;

export default {
	TemplateList,
	TemplateListItem,
	Fields,
	ActionButton,
	Wrapper,
	FieldDescription,
	FieldDescriptionContent,
	FieldDescriptionIcon,
	IconStack
};
