import styled from "@emotion/styled";
import Buttons from "@/lib/theme/components/buttons";
import { containers } from "@/lib/theme/components/container.style";
import { font } from "@/lib/theme/font";
import { flex } from "@/lib/theme/snippets/flex";
import { inputStyle } from "@/lib/theme/snippets/input";
import { radius } from "@/lib/theme/snippets/radius";
import { spacing, spacingValue } from "@/lib/theme/snippets/spacing";

/** TODO: I implemented these styles for LogbookForm initially, but I like them
 * enough that I want to implement them as app-wide alternate form styles (in
 * addition to those we use elsewhere. Since they'll be shared, we should
 * extract as many parts to generic snippets as possible for re-use outside of
 * forms, for the consistency of the visual design. */

const Form = styled.form`
   --shadow-1: var(--bg-5-1);
   --border-1: ${(p) => p.theme.colors.background.main[0]};

	${containers.minimal};

	width: max-content;
`;

const FormTitle = styled.h1`
	${radius.medium};
	gap: ${spacingValue.medium};

	font-size: ${font.size["2"]};
	box-shadow: 0 0.5rem 1.5rem -0.6rem var(--shadow-1);

	border-bottom: 3px solid var(--border-1);

	display: flex;
	align-items: center;

	${spacing.padding.wide({ size: 1, ratio: 2 })}
	padding-inline: ${spacingValue.medium};
	padding-bottom: 0.2rem;

	margin: 0;
	margin-bottom: ${spacingValue.medium};
`;

// these do not have styles associated with them (yet), but exporting them makes
// it clearer that they're part of the styled form structure. Styles are
// defined in the Label, for now.
const Input = styled.input``;
const TextArea = styled.textarea``;
const Select = styled.select``;

const Label = styled.label`
	${flex.column};
	background-color: ${(p) => p.theme.colors.background.main[0]};
;
	${spacing.padding.small};
	${radius.medium}
	box-shadow: 0 0.2rem 0.3rem 0 var(--shadow-1);

	span {
		font-size: ${font.size["0.9"]};
		color: ${(p) => p.theme.colors.text.main[3]};
		padding-left: 0.5rem;

		// The following rules are here because of cases where we alias Label to
		// something else (e.g. as="div")
		user-select: none;
		cursor: default;
	}

	${Input},
	${TextArea},
	${Select} {
      ${inputStyle};

		resize: none;

		line-height: 1.5rem;
		&:not(&[type="checkbox"]) {
			height: 1.5rem;
		}

		background-color: ${(p) => p.theme.colors.background.main[1]};

      font-size: ${font.size["0.93"]};
		margin: ${spacingValue.smaller};
		${spacing.padding.wide({ size: 0.3, ratio: 2 })}
		${radius.small};

	}

   .lucide {
      color: ${(p) => p.theme.colors.text.main[1]};
   }
`;

/**
 * @todo extract this Button to theme buttons lib? -- make note of the default margin, which I dislike
 * */
const Submit = styled(Buttons.Action.CallToAction)`
   margin-top: 1rem;
   padding: 0.5rem 1rem;
`;

export default { Form, FormTitle, Label, Submit, Input, TextArea, Select };
