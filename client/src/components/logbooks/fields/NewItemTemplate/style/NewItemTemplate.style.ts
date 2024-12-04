import _commonStyle from "@/components/logbooks/LogDetail/style/_common.style";
import { flex } from "@/lib/theme/snippets/flex";
import scrollbar from "@/lib/theme/snippets/scroll";
import { spacing } from "@/lib/theme/snippets/spacing";
import styled, { css } from "styled-components";

const sectionShade = css`
	${_commonStyle.outline.primary};
	${_commonStyle.sectionShadow};
	${_commonStyle.border.light};
`;

const Row = styled.fieldset`
	${_commonStyle.margin.small};
	${flex.row};

	padding: 0;
	justify-content: space-between;
`;

// TODO: rename this to FormFields to prevent confusion with the concept of
// FieldTemplates, which happen to be part of this form.
const Fields = styled.div`
	${flex.column};
	${_commonStyle.radius.medium}
	${sectionShade};

	padding: ${_commonStyle.spacingValue.small};
	margin-bottom: ${_commonStyle.spacingValue.medium};
	background-color: #eee;
`;

const FieldTemplatesWrapper = styled.div`
	${flex.column};
	${spacing.padding.wide({ size: 0.5, ratio: 2 })};
	${_commonStyle.radius.small}
	${sectionShade};
`;

// I would like to conditionally style the list to indicate that it is
// scrollable, but styled-components doesn't support container queries yet.
/* @container (min-width: 450px) {
      background-color: red;
   } */
const FieldTemplates = styled.div`
	${flex.row};
	padding: ${_commonStyle.spacingValue.small};
	${scrollbar.hidden};

	max-width: 440px;
	overflow-x: auto;
	height: max-content;
	gap: 0.3rem;
	margin-bottom: 1.5rem;
	align-self: flex-start;
`;

export default { Row, Fields, FieldTemplatesWrapper, FieldTemplates };
