import StyledButtons from "@/lib/theme/components/Button.style";
import DefaultInput from "@/lib/theme/components/input/DefaultInput.style";
import { flex } from "@/lib/theme/snippets/flex";
import styled from "styled-components";

const ClearEndDateButton = styled(StyledButtons.Unstyled)`
	cursor: pointer;
	background-color: ${(p) => p.theme.colors.red.secondary};
	box-shadow: 0 0 0.4rem 0 #aaa;
	padding: 0.4rem;
	border-radius: 50%;

	display: flex;
	align-items: center;
	height: max-content;
	width: max-content;

	outline: 2px solid azure;
	&:hover,
	&:focus,
	&:active {
		outline: 2px solid azure;
		box-shadow:
			0 0.2rem 0 0 ${(p) => p.theme.colors.red.main},
			0 0 0.2rem 0 #555;
		transform: translateY(2px);
		background-color: ${(p) => p.theme.colors.red.main};
	}
`;

const SetEndDateButton = styled(StyledButtons.Unstyled)`
	${flex.row};
	align-items: center;
	gap: 1rem;

	font-size: 0.85rem;
	align-self: flex-start;
	padding: 0.5rem;
	border-radius: 3px;
	background-color: #fff;
	outline: 2px solid #ddd;
	box-shadow: 0 0.1rem 0.3rem 0 #aaa;
	cursor: pointer;

	&:hover {
		background-color: #eee;
		outline: 2px solid #aaa;
		transform: translateY(2px);
	}
`;

const RadioButton = styled.input`
	position: absolute; // visually hidden --- 100% sure this is not the best way to do this
	width: 0;
	height: 0;
`;

const RadioLabelText = styled.span`
	// needs to be a span because a parent element styles this
	gap: 0.3rem;
	align-items: center;
`;

const RadioOption = styled.label`
	font-size: 0.8rem;
	width: 50%;
	padding: 0.5rem;
	border-radius: 2px;
	border: 2px solid #eee;
	outline: 2px solid white;
	background-color: #eee;
	box-shadow: 0 0.4rem 0.5rem 0 #e1e1e1;

	${RadioLabelText} {
		font-size: 0.85rem;
		font-weight: 500;

		box-shadow: 0 0.5rem 0 -0.3rem white;
		display: flex;
		margin-bottom: 0.3rem;
	}

	// selector for any selected children
	&:has(input[type="radio"]:checked) {
		border-color: ${(p) => p.theme.colors.green.secondary};
		background-color: #eee;
		box-shadow:
			0 0.6rem 1rem -0.4rem #aaa,
			0.3rem 0.5rem 0.1rem -0.1rem ${(p) => p.theme.colors.green.secondary};

		${RadioLabelText} {
			box-shadow: 0 0.5rem 0 -0.3rem ${(p) => p.theme.colors.green.secondary};
		}
	}
`;

const Label = styled.label`
	margin-top: 0.3rem;
	font-size: 0.8rem;
	${flex.column};
	justify-content: space-between;

	span {
		background-color: white;
		color: #777;
		display: flex;
		margin-bottom: 0;
		padding-bottom: 0;
		padding-left: 0.4rem;
		line-height: 0.8rem;
		height: 1.2rem;
		align-items: center;
	}

	${DefaultInput} {
		padding-top: 0.1rem;
	}
`;

export default {
	ClearEndDateButton,
	SetEndDateButton,
	RadioButton,
	RadioOption,
	Label,
	RadioLabelText
};
