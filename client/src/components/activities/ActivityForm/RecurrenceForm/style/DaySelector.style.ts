import Buttons from "@/lib/theme/components/buttons";
import formStyle from "@/lib/theme/components/form.style";
import Input from "@/lib/theme/input";
import Active from "@/lib/theme/snippets/active";
import { noBorders } from "@/lib/theme/snippets/border";
import styled from "@emotion/styled";

const Trigger = styled(Buttons.Unstyled)`
	padding: 0.4rem 0.5rem;

	background-color: #fff;
	border: 2px solid #ddd;
	border-radius: 8px;
	margin-top: 0.3rem;

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
	background-color: #eee;
	padding: 1rem;
	outline: 2px solid #ccc;
	box-shadow: 0 0.2rem 0.5rem -0.1rem #aaa;
	z-index: 10;
	margin-top: 0.8rem;
	border-radius: 5px;
`;

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
	border-radius: 5px;
	background-color: #eee;

	option {
		background-color: #eee;
		border: none;
		outline: none;
	}

	${Active.default};
`;

const ActionBar = styled.div`
	background-color: #fff;
	outline: 2px solid #e9e9e9;
	padding: 0.3rem;
	margin: 0.2rem;
	margin-bottom: 0.5rem;
	border-radius: 5px;

	width: max-content;
`;

const ClearButton = styled(Buttons.Unstyled)`
	border-radius: 50%;
	display: flex;
	align-items: center;

	.lucide {
		color: orangered;
	}

	&:disabled {
		cursor: unset;

		.lucide {
			color: #ccc;
		}
	}

	${Active.default};
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
	ClearButton,
	Label
};
