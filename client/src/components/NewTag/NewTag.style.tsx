import { getFontSize } from "@/lib/theme/font";
import { inputStyle } from "@lib/theme/snippets/input";
import styled from "styled-components";

// TODO: style this similarly to NewActivity -- this means creating common theme
// snippets for 'Form', 'FormTitle', 'Fields', etc.
export const Form = styled.section`
	display: flex;
	flex-direction: column;
	margin: 1.2rem;
	padding: 0.6rem 0.9rem;
	justify-content: space-between;
	border: 3px solid limegreen;

	h1 {
		width: max-content;
		margin: 0;
		margin-top: -1.5rem;
		margin-left: 0.2rem;
		margin-bottom: 0.6rem;

		font-size: ${(p) => getFontSize(p, 1.2)};

		border: 2px solid #ccc;
		border-radius: 2px;
		padding: 0.2rem 0.8rem;
		background-color: #ddd;
	}

	box-shadow: 0 0 1rem 0 #ccc;
	width: max-content;
`;

export const Fields = styled.form`
	position: relative;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 0.4rem;
	padding-bottom: 0.9rem;
`;

export const Field = styled.label`
	display: flex;
	flex-direction: column;
	gap: 0.2rem;

	input {
		${inputStyle}
	}
`;

export const Button = styled.button`
	width: 50px;
	height: 30px;
	border-radius: 3px;

	position: absolute;
	border: 2px solid #fff;
	bottom: -1.5rem;
	right: -2.5rem;
	box-shadow:
		0 0 1rem 0 #ccc,
		0.2rem 0.3rem 0 deepskyblue,
		-0.2rem -0.4rem 0 -0.1rem indigo;

	background-color: orange;

	&:hover {
		background-color: azure;
		border-radius: 0;
		box-shadow: 0 0.6rem 0 -0.2rem limegreen;
		border: 2px solid limegreen;
		transform: scale(1.2) translateY(-3px);
	}
`;

export const Tags = styled.div`
	grid-column: 1 / span 2;
`;
