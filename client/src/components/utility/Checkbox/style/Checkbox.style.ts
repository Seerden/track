import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { noBorders } from "@/lib/theme/snippets/border";

const defaultCheckboxStyle = css`
	display: flex;
	${noBorders}
`;

const Checked = styled.div`
	${defaultCheckboxStyle};

	color: ${(p) => p.theme.colors.green.main};
`;

const Unchecked = styled.div`
	${defaultCheckboxStyle};

	color: #ccc;
`;

const Wrapper = styled.span`
	// NOTE: Checkboxes will usually be inside form labels, which have padding
	// applied. This is the easiest way to negate that.
	padding-left: 0 !important;
	display: flex;
	align-self: center;
	justify-self: center;

	cursor: pointer;

	/* TODO: these styles don't quite work as intended. If the Checkbox is inside
  a label, we want to apply the following styles when the label element is
  hovered/active/etc, not only when the checkbox _itself_ is in that state. */
	&:hover,
	&:focus-within,
	&:active {
		${Checked} {
			color: limegreen;
		}

		${Unchecked} {
			color: #bbb;
		}
	}
`;

const Checkbox = {
	Wrapper,
	Checked,
	Unchecked,
};

export default Checkbox;
