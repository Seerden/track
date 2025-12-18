import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { inputStyle } from "@lib/theme/snippets/input";
import { motion, type Variants } from "motion/react";
import type { PropsWithChildren } from "react";
import { font } from "@/lib/theme/font";
import Input from "@/lib/theme/input";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import { spacing, spacingValue } from "@/lib/theme/snippets/spacing";

const Wrapper = styled.div`
	${spacing.padding.wide({ size: 0.5, ratio: 2 })};
	/* TODO: is there a reason this has to be 0.8, or can we use spacingValue.medium? */
	padding-top: 0.8rem;
	/* TODO: same note as with the top padding. */
	margin: 1.2rem;

	border: 2px solid ${(p) => p.theme.colors.background.main[5]};
   
	max-width: 500px;

	box-shadow: 0 0.3rem 1.2rem -0.1rem var(--bg-5-1);
`;

const FormTitle = styled(motion.h1)`
   /* NOTE: formTitleMotionVariants depends on this */
   --shadow-1: -0.3rem 0.25rem 0 0 ${(p) => p.theme.colors.background.main[5]},
		-0.6rem -0.4rem 0 0 ${(p) => p.theme.colors.blue.main};		

   ${flex.row};
	font-size: ${font.size["1.1"]};
	margin: 0;
	margin-left: 0.8rem;
	margin-top: -1.5rem;
	margin-bottom: 0.9rem;

	max-width: max-content;
	background-color: ${(p) => p.theme.colors.background.main[3]};
	${spacing.padding.wide({ size: 0.5, ratio: 3 })};
	box-shadow: var(--shadow-1)
`;

const formTitleMotionVariants: Variants = {
	closed: {
		boxShadow: "none",
	},
	opened: {
		boxShadow: "var(--shadow-1)",
	},
};

function MotionFormTitle({
	children,
	...props
}: PropsWithChildren<Parameters<typeof FormTitle>[0]>) {
	return (
		<FormTitle
			variants={formTitleMotionVariants}
			initial="closed"
			animate="opened"
			exit="closed"
			{...props}
		>
			{children}
		</FormTitle>
	);
}

const RowTitle = styled.h3<{ $inverted?: boolean; $inline?: boolean }>`
	${spacing.padding.wide({ size: 0.3, ratio: 2.5 })};

   ${(p) =>
			!p.$inline &&
			`
            margin: 0;
            margin-top: -2rem;
         `}

	background-color: ${(p) => (p.$inverted ? p.theme.colors.background.main[3] : p.theme.colors.background.contrast[3])};
	color: ${(p) => (p.$inverted ? p.theme.colors.text.main[2] : p.theme.colors.text.contrast[2])};
	max-width: max-content;
	font-size: ${font.size["1.1"]};

	${radius.small};
	border: 2px solid ${(p) => p.theme.colors.background.contrast[5]};
`;

// TODO: I copy-pasted this from the TagSelector Title to see how it looks.
// Generalize if we want to reuse it here.
const Row = styled.fieldset`
	${flex.row};
	padding: ${spacingValue.small};
	gap: ${spacingValue.small};

	width: 100%;
	max-width: 100%;
	border: 1px solid var(--bg-5-3);
	box-shadow: 0.6rem 0.6rem 0 -0.5rem ${(p) => p.theme.colors.dark[4]};
	justify-content: space-between;

	&:focus-within {
		/* TODO: use to-be-created highlight color I made a TODO about */
		border-left-color: ${(p) => p.theme.colors.blue.main};
	}
`;

const CompactRow = styled(Row)`
	align-items: baseline;

	${Input.Default} {
		line-height: 0.93rem;
		font-size: ${font.size["0.93"]};;
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
	font-size: ${font.size["0.93"]};;

	&:has(textarea) {
		width: 100%;
	}

	border-radius: 0 15px 0 0;
	margin: 0;

	&:active,
	&:focus-within {
		outline: 2px solid ${(p) => p.theme.colors.blue.main};

		span {
			outline: 2px solid var(--bg-0-1);
		}
	}

	span {
		background-color: var(--bg-0-1);
      color: ${(p) => p.theme.colors.text.main[0]};
;
		${spacing.padding.wide({ size: 0.2, ratio: 3 })};
		border-radius: 0 15px 0 0;
		font-size: ${font.size["0.93"]};;
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
	FormTitle: MotionFormTitle,
	Row,
	RowTitle,
	CompactRow,
	Form,
	Label,
};

export default formStyle;
