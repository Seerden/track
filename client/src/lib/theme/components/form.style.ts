import { Submit } from "@/lib/theme/components/buttons";
import { getFontSize } from "@/lib/theme/font";
import { border, outline, thinBorder } from "@/lib/theme/snippets/edge";
import { flex } from "@/lib/theme/snippets/flex";
import { spacing, spacingValue } from "@/lib/theme/snippets/spacing";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { inputStyle } from "@lib/theme/snippets/input";

const Wrapper = styled.div`
	${spacing.padding.wide({ size: 0.5, ratio: 2 })};
	/* TODO: is there a reason this has to be 0.8, or can we use spacingValue.medium? */
	padding-top: 0.8rem;
	/* TODO: same note as with the top padding. */
	margin: 1.2rem;
	${border.grey};
	max-width: 500px;
	box-shadow: 0 0.3rem 1.2rem -0.1rem #ddd;
`;

const FormTitle = styled.h1`
	font-size: ${(p) => getFontSize(p, 1.1)};
	margin: 0;
	margin-left: 0.8rem;
	margin-top: -1.5rem;
	margin-bottom: 0.9rem;

	max-width: max-content;
	background-color: #ddd;
	${spacing.padding.wide({ size: 0.5, ratio: 3 })};
	box-shadow:
		-0.2rem 0.2rem 0 0 #ccc,
		-0.6rem -0.4rem 0 0 ${(p) => p.theme.colors.blue.main},
		0 0 0.2rem 0 #333,
		-0.2rem -0.3rem 0 0 white;
`;

const Row = styled.fieldset`
	${flex.row};
	padding: ${spacingValue.small};
	gap: ${spacingValue.small};

	width: 100%;
	max-width: 100%;
	${thinBorder.primary};
	justify-content: space-between;
	box-shadow: 0.6rem 0.6rem 0 -0.5rem #555;

	&:focus-within {
		border-left-color: ${(p) => p.theme.colors.blue.main};
	}
`;

const CompactRow = styled(Row)`
	align-items: baseline;

	input {
		${inputStyle};
		line-height: 0.93rem;
		font-size: 0.93rem;

		width: 50px;
	}
`;

const Form = styled.form`
	${flex.column};
	gap: ${spacingValue.medium};
	padding: 0 ${spacingValue.small};
`;

const Label = styled.label<{ $showWarning?: boolean }>`
	${flex.column};
	width: 75%;
	font-size: ${(p) => getFontSize(p, 0.9)};

	&:has(textarea) {
		width: 100%;
	}

	border-radius: 0 15px 0 0;
	margin: 0;

	&:active,
	&:focus-within {
		outline: 2px solid ${(p) => p.theme.colors.blue.main};

		span {
			${outline.primary};
		}
	}

	span {
		background-color: #fff;
		${spacing.padding.wide({ size: 0.2, ratio: 3 })};
		border-radius: 0 15px 0 0;
		font-size: ${(p) => getFontSize(p, 0.9)};
	}

	textarea {
		resize: none;
		height: 100px;
		min-width: 100%;

		&:not([type="checkbox"]) {
			/* max-width: 150px;
         width: 150px; */

			${inputStyle}
		}
	}

	outline: 2px solid ${(p) => (p.$showWarning ? "orangered" : "transparent")};
	border-bottom: ${(p) => (p.$showWarning ? css`2px solid orangered` : "")};
`;

const formStyle = {
	Wrapper,
	FormTitle,
	Row,
	CompactRow,
	Form,
	Button: Submit.Default,
	Label
};

export default formStyle;
