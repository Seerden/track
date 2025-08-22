import Buttons from "@/lib/theme/components/buttons";
import formStyle from "@/lib/theme/components/form.style";
import Input from "@/lib/theme/input";
import Active from "@/lib/theme/snippets/active";
import { noBorders } from "@/lib/theme/snippets/border";
import { border, outline } from "@/lib/theme/snippets/edge";
import { radius } from "@/lib/theme/snippets/radius";
import { spacing, spacingValue } from "@/lib/theme/snippets/spacing";
import styled from "@emotion/styled";

const Trigger = styled(Buttons.Unstyled)`
	${spacing.padding.small};
	${border.tertiary};
	${radius.largish};
	margin-top: ${spacingValue.smaller};

	background-color: #fff;
	box-shadow: 0 0.2rem 0.2rem 0 #ccc;

	&:hover,
	&:focus {
		box-shadow: none;
		transform: translateY(2px);
	}

	${Active.default};
`;

// TODO: put this in floating.style.ts!
const FloatingWrapper = styled.div`
	${spacing.padding.small};
	${outline.grey};
	margin-top: ${spacingValue.small};
	${radius.medium};

	background-color: #eee;
	box-shadow: 0 0.2rem 0.5rem -0.1rem #aaa;

	z-index: 10;
`;

// TODO: put this in input.style
const NumberInput = styled(Input.Unstyled)`
	display: flex;
	border-bottom: 1px solid #555;
	margin-bottom: -1px;
	align-self: center;
	width: 3ch;
	height: max-content;

	// The following rules are to hide the up/down arrows.
	-moz-appearance: textfield;
	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
`;

const Select = styled.select`
	${noBorders};
	${radius.medium};
	background-color: #eee;

	option {
		background-color: #eee;
		border: none;
		outline: none;
	}

	${Active.default};
`;

// TODO: put all action bars in containers.style
const ActionBar = styled.div`
	width: max-content;

	padding: ${spacingValue.smaller};
	margin: ${spacingValue.smallest};
	margin-bottom: ${spacingValue.small};
	${radius.medium}

	background-color: #fff;
	outline: 2px solid #e9e9e9; // TODO: theme value
`;

const Label = styled(formStyle.Label)`
	${Active.default};
`;

export default {
	Trigger,
	FloatingWrapper,
	NumberInput,
	Select,
	ActionBar,
	Label,
};
