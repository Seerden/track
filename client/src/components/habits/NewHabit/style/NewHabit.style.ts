import styled from "@emotion/styled";
import { font } from "@/lib/theme/font";
import Input from "@/lib/theme/input";
import { flex } from "@/lib/theme/snippets/flex";
import { inputStyle } from "@/lib/theme/snippets/input";
import { radius } from "@/lib/theme/snippets/radius";
import { spacingValue } from "@/lib/theme/snippets/spacing";

const ClearEndDateButtonWrapper = styled.div`
	position: absolute;
	--offset: 0.1rem;
	top: var(--offset);
	right: var(--offset);
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
	
   border: 2px solid var(--bg-5-3);
	outline: 2px solid 2px solid var(--bg-3-1);

	background-color: ${(p) => p.theme.colors.background.main[3]};

   --shadow-1: var(--bg-4-1);
   --shadow-2: var(--bg-5-2);
	box-shadow: 0 0.2rem 0.5rem 0 var(--shadow-1);

	${RadioLabelText} {
		font-size: ${font.size["0.85"]};
		font-weight: 500;

		box-shadow: 0 0.5rem 0 -0.3rem #fff;
		display: flex;
		margin-bottom: 0.3rem;
	}

	&:has(input[type="radio"]:checked) {
		border-color: ${(p) => p.theme.colors.green.secondary};
		background-color: ${(p) => p.theme.colors.background.main[3]};

		box-shadow:
			0.3rem 0.4rem 0 -0.1rem ${(p) => p.theme.colors.green.secondary},
         0 0.6rem 1rem -0.4rem var(--shadow-1);

		&:focus-within {
			box-shadow:
				0 0.6rem 1rem -0.4rem var(--shadow-1),
				0.3rem 0.4rem 0 -0.1rem ${(p) => p.theme.colors.green.secondary},
				0 0.3rem 1.2rem 0 var(--shadow-2);
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
		background-color: #fff;
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
			background-color: #fff;
		}
	}
`;

const ProgressionFieldset = styled.fieldset`
	${flex.column};
	
	// TODO TRK-231: theme value
	padding: 1.2rem;

	/* TODO: same as other fieldsets */
   border: 1px solid var(--bg-5-3);
	box-shadow: 0.6rem 0.6rem 0 -0.5rem ${(p) => p.theme.colors.dark[4]};
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
