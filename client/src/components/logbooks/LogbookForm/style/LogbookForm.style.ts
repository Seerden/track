import { Button, Title } from "@/components/logbooks/LogDetail/style/_common.style";
import containers from "@/lib/theme/components/container.style";
import { font } from "@/lib/theme/font";
import { flex } from "@/lib/theme/snippets/flex";
import styled from "styled-components";

const Form = styled.form`
	${containers.minimal};

	width: max-content;
`;

const FormTitle = styled(Title)`
	display: flex;
	align-items: center;
	gap: 1rem;
	padding: 1rem 2rem;
	padding-bottom: 0.2rem;
	margin-bottom: 1rem;
`;

const Label = styled.label`
	${flex.column};
	background-color: #fff;
	padding: 0.4rem;
	border-radius: 6px;
	box-shadow: 0 0.2rem 0.3rem 0 #aaa;

	span {
		font-size: ${font.size["0.9"]};
		color: #333;
		padding-left: 0.5rem;
	}

	input,
	textarea,
	select {
		resize: none;
		margin: 0.3rem;
		font-size: ${font.size["0.93"]};
		border: none;
		line-height: 1.5rem;

		&:not(&[type="checkbox"]) {
			height: 1.5rem;
		}
		background-color: #fff;
		padding: 0.3rem 0.6rem;
		border: 1px solid #ddd;
		border-radius: 3px;
	}
`;

const Submit = styled(Button)`
	color: #eee;
	margin-top: 1rem;
	padding: 1rem;
`;

Submit.defaultProps = {
	type: "submit"
};

export default { Form, FormTitle, Label, Submit };
