import styled from "@emotion/styled";
import Buttons from "@/lib/theme/components/buttons";
import { font } from "@/lib/theme/font";
import Input from "@/lib/theme/input";
import { border, outline } from "@/lib/theme/snippets/edge";
import { flex } from "@/lib/theme/snippets/flex";
import { inputStyle } from "@/lib/theme/snippets/input";
import { radius } from "@/lib/theme/snippets/radius";
import { spacing, spacingValue } from "@/lib/theme/snippets/spacing";

const ClearEndDateButtonWrapper = styled.div`
	position: absolute;
	--offset: 0.1rem;
	top: var(--offset);
	right: var(--offset);
`;

const SetEndDateButton = styled(Buttons.Action.Stylized)`
	${flex.row};

	width: max-content;

   align-self: flex-end;

	gap: ${spacingValue.medium};
	${radius.small};
   ${spacing.padding.small};

	color: #000;

	svg {
		color: #000;
	}
`;

const RadioButton = styled.input`
	position: absolute; // visually hidden --- 100% sure this is not the best way to do this
	width: 0;
	height: 0;
`;

const RadioField = styled.fieldset`
	${flex.row};
	gap: ${spacingValue.medium};
	padding: 0;
`;

const RadioLabelText = styled.span`
	// needs to be a span because a parent element styles this
	gap: ${spacingValue.smaller};
	align-items: center;
`;

const RadioOption = styled.label`
	width: 50%;
	padding: ${spacingValue.small};
	${radius.small};
	${border.secondary};
	${outline.primary};
	background-color: ${(p) => p.theme.colors.background.main[3]};
	box-shadow: 0 0.4rem 0.5rem 0 #ddd;

	${RadioLabelText} {
		font-size: ${font.size["0.85"]};
		font-weight: 500;

		box-shadow: 0 0.5rem 0 -0.3rem white;
		display: flex;
		margin-bottom: 0.3rem;
	}

	&:has(input[type="radio"]:checked) {
		border-color: ${(p) => p.theme.colors.green.secondary};
		background-color: ${(p) => p.theme.colors.background.main[3]};

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
	font-size: ${font.size["0.82"]};
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

	${Input.Default} {
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
	${radius.small};
	${outline.primary};

	// TODO TRK-231: theme value
	padding: 1.2rem;

	background-color: white;
	box-shadow: 0 0 0.3rem 0 #aaa;
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
   padding-top: ${spacingValue.small};

	--gap: ${spacingValue.small};
	gap: var(--gap);

   .mantine-DatePickerInput {
      &-root {
         width: calc(50% - var(--gap));
      }
   }
	
`;

export default {
	ClearEndDateButtonWrapper,
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
	DateFields,
};
