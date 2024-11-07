import { getFontSize } from "@/lib/theme/font";
import { inputStyle } from "@lib/theme/snippets/input";
import { styled } from "styled-components";

export const Wrapper = styled.section`
	padding: 0.6rem 0.9rem;
	border: 2px solid deeppink;
	margin: 1.2rem;
	box-shadow: 0 0 1rem 0 #ccc;
	width: 750px;

	margin: 1.2rem auto;
`;

export const Title = styled.h2`
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
`;

export const Field = styled.span`
	display: flex;
	flex-direction: column;
`;

export const Label = styled.label`
	display: flex;
	width: max-content;
	padding: 0.2rem 0.8rem;
	background-color: deeppink;
	color: azure;
	margin-left: -0.5rem;
`;

export const Input = styled.input`
	max-width: 250px;
	border: none;

	${inputStyle};
	border-left: 3px solid deeppink;
`;

export const MainFields = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
`;

export const TextArea = styled.textarea`
	border: none;
	border-bottom: 1px solid #ccc;
	padding: 0.3rem 0.5rem;
	width: 100%;
	min-height: 100px;
	margin-bottom: 1rem;

	resize: none;

	${inputStyle}
	border-left: 3px solid deeppink;
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	position: relative;
`;

// copied from NewTag, just as a starting point
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

export const Content = styled(Field)`
	display: grid;
`;
