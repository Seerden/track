import StyledButtons from "@/lib/theme/components/Button.style";
import F from "@/lib/theme/components/form.style";
import DefaultInput from "@/lib/theme/components/input/DefaultInput.style";
import { font } from "@/lib/theme/font";
import { flex } from "@/lib/theme/snippets/flex";
import { inputStyle } from "@/lib/theme/snippets/input";
import styled from "styled-components";

const ClearEndDateButtonWrapper = styled.div`
	position: absolute;
	--offset: 0.1rem;
	top: var(--offset);
	right: var(--offset);
`;

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

const RadioField = styled.fieldset`
	${flex.row};
	gap: 1rem;
	padding: 0;
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

	&:has(input[type="radio"]:checked) {
		border-color: ${(p) => p.theme.colors.green.secondary};
		background-color: #eee;

		box-shadow:
			0 0.6rem 1rem -0.4rem #aaa,
			0.3rem 0.5rem 0.1rem -0.1rem ${(p) => p.theme.colors.green.secondary};

		&:focus-within {
			box-shadow:
				0 0.6rem 1rem -0.4rem #aaa,
				0 0.3rem 1.2rem 0 #ccc,
				0.3rem 0.5rem 0.1rem -0.1rem ${(p) => p.theme.colors.green.secondary};
		}

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

	&:has(input:disabled) {
		opacity: 0.5;

		input {
			background-color: white;
		}
	}
`;

const ProgressionFieldset = styled.fieldset`
	${flex.column};
	background-color: white;
	border-radius: 3px;
	box-shadow: 0 0 0.3rem 0 #aaa;
	outline: 2px solid white;
	padding: 1.2rem;
`;

const ProgressionTitle = styled.div`
	font-size: ${font.size[0.93]};
	margin-bottom: 0.4rem;
`;

const Select = styled.select`
	${inputStyle}
	width: 6rem; // largest value is "months", so 6rem is enough to fit everything and prevent layout shifts
`;

const FixedLengthString = styled.span`
	display: inline-block;
	width: 2.2rem;
`;

const DateFields = styled.div`
	${flex.row};
	justify-content: space-between;

	--gap: 0.5rem;
	gap: var(--gap);

	${F.Label} {
		width: calc(50% - var(--gap));
	}
`;

export default {
	ClearEndDateButtonWrapper,
	ClearEndDateButton,
	SetEndDateButton,
	RadioField,
	RadioButton,
	RadioOption,
	Label,
	RadioLabelText,
	ProgressionFieldset,
	ProgressionTitle,
	Select,
	FixedLengthString,
	DateFields
};
