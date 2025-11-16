import styled from "@emotion/styled";
import { font } from "@/lib/theme/font";
import { noBorders } from "@/lib/theme/snippets/border";
import { outline } from "@/lib/theme/snippets/edge";
import { inputStyle } from "@/lib/theme/snippets/input";

const Unstyled = styled.input`
	${noBorders};
	background-color: transparent;
	padding: 0;
	margin: 0;
`;

const Default = styled.input`
	${inputStyle};
`;

const Filter = styled(Default)`
	max-width: 150px;

	--font-size: ${font.size["0.88"]};
	font-size: var(--font-size);
	// inputStyle does not have this
	line-height: var(--font-size);

	${outline.grey};

	&:focus {
		outline-color: ${(p) => p.theme.colors.blue.secondary};
		box-shadow: 0rem 0.5rem 0.2rem -0.2rem #ccc;
	}
`;

// Some inputs need to be present in the DOM, but now visible, e.g. because we
// render something else in place of the input (example: Checkbox.tsx).
const Hidden = styled(Unstyled)`
	opacity: 0;
	width: 0;
	height: 0;
`;

const Input = {
	Unstyled,
	Default,
	Filter,
	Hidden,
};

export default Input;
