import F from "@/components/logbooks/LogbookForm/style/LogbookForm.style";
import { font } from "@/lib/theme/font";
import { flex } from "@/lib/theme/snippets/flex";
import styled from "styled-components";

const Fields = styled.div`
	${flex.row};

	margin-top: 0.5rem;
	gap: 0.3rem;
`;

const Wrapper = styled.div`
	position: relative;
	color: #555;
	font-weight: 400;

	padding: 0.5rem 1rem;
	padding-top: 1rem;

	width: max-content;
	border-radius: 12px;
	/* border: 2px solid dodgerblue; */
	outline: 2px solid #fff;
	box-shadow:
		0 0.4rem 0 0 #ccc,
		0 0 0.8rem 0 #ccc;
`;

const Title = styled.h2`
	font-size: ${font.size["0.93"]};

	position: absolute;
	top: -1rem;
	right: 4rem;
	border-radius: 3px;
	background-color: #666;
	color: white;
	padding: 0.3rem 1rem;
`;

const Column = styled.fieldset`
	${flex.column};

	gap: 0.3rem;
	margin: 0 0.2rem;
	background-color: #e9e9e9;
	padding: 0.2rem;
	outline: 2px solid #ddd;
	border-radius: 5px;
	height: max-content;
`;

const Label = styled(F.Label)`
	${flex.column};
	margin: 0;

	span,
	input {
		font-size: ${font.size["0.8"]};
	}

	input {
		margin: 0.1rem;
		padding: 0.1rem 0.2rem;
	}

	padding: 0.2rem;
`;

export default {
	Fields,
	Wrapper,
	Title,
	Column,
	Label
};
