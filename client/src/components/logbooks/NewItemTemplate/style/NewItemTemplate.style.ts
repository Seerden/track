import { border, outline } from "@/lib/theme/snippets/edge";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import scrollbar from "@/lib/theme/snippets/scroll";
import shadows from "@/lib/theme/snippets/shadow";
import { spacing, spacingValue } from "@/lib/theme/snippets/spacing";
import styled, { css } from "styled-components";

const sectionShade = css`
	${outline.primary};
	${border.light};
	${shadows.section};
`;

const Row = styled.fieldset`
	${spacing.margin.small};
	${flex.row};

	padding: 0;
	justify-content: space-between;
`;

// TODO: rename this to FormFields to prevent confusion with the concept of
// FieldTemplates, which happen to be part of this form.
const Fields = styled.div`
	${sectionShade};

	${flex.column};
	${radius.medium};

	${spacing.padding.small};
	margin-bottom: ${spacingValue.medium};
	background-color: #eee;
`;

const FieldTemplatesWrapper = styled.div`
	${flex.column};
	${spacing.padding.wide({ size: 0.5, ratio: 2 })};
	${radius.small};
	${sectionShade};
`;

// I would like to conditionally style the list to indicate that it is
// scrollable, but styled-components doesn't support container queries yet.
/* @container (min-width: 450px) {
      background-color: red;
   } */
const FieldTemplates = styled.div`
	${flex.row};
	${spacing.padding.small};
	${scrollbar.hidden};

	max-width: 440px;
	overflow-x: auto;
	height: max-content;
	gap: 0.3rem;
	margin-bottom: 1.5rem;
	align-self: flex-start;
`;

export default { Row, Fields, FieldTemplatesWrapper, FieldTemplates };
