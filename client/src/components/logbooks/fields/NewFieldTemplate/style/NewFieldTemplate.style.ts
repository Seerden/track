import { font } from "@/lib/theme/font";
import { flex } from "@/lib/theme/snippets/flex";
import styled from "styled-components";

const Form = styled.form`
	position: relative;
	color: #555;
	font-weight: 400;

	${flex.row};

	gap: 0.5rem;
	padding: 0.5rem 1rem;
	padding-top: 1rem;

	width: max-content;
	border-radius: 12px;
	border: 2px solid dodgerblue;
	outline: 2px solid #fff;
	box-shadow:
		0 0.5rem 0 0 dodgerblue,
		0 0 0.8rem 0 lightblue;
`;

const Title = styled.h2`
	font-size: ${font.size["1"]};

	position: absolute;
	top: -1rem;
	right: 4rem;
	border-radius: 3px;
	background-color: royalblue;
	color: white;
	padding: 0.2rem 1rem;
	height: 2rem;
	display: flex;
`;

const Column = styled.fieldset`
	${flex.column};
`;

const Label = styled.label`
	${flex.column}
	font-size: ${font.size["0.93"]};
	span {
	}

	input {
		outline: none;
		border: none;
		background-color: none;
		padding: 0;
		margin: 0;
	}
`;

export default {
	Form,
	Title,
	Column,
	Label
};
