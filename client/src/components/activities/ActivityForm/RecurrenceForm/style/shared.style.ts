import Buttons from "@/lib/theme/components/buttons/buttons";
import formStyle from "@/lib/theme/components/form.style";
import UnstyledInput from "@/lib/theme/components/input/UnstyledInput.style";
import { noBorders } from "@/lib/theme/snippets/border";

import styled, { css } from "styled-components";

/* Shared styles for DayOfWeekSelector and DayOfMonthSelector, because they're
basically the same thing. */

const activeStyle = css`
	outline: 2px solid deepskyblue;
`;

export const active = css`
	&:active,
	&:focus {
		${activeStyle};
	}
`;

const Cell = styled(Buttons.Unstyled)<{ $active?: boolean }>`
	font-size: 0.85rem;
	display: flex;
	width: 22px;
	height: 22px;
	margin: 4px;
	justify-content: center;
	align-items: center;
	border-radius: 3px;
	background-color: #dfdfdf;

	${(p) =>
		p.$active &&
		css`
			background-color: ${p.theme.colors.blue.main};
			color: #fff;
		`}

	${active};
`;

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

	${active};
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

const NumberInput = styled(UnstyledInput)`
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
NumberInput.defaultProps = {
	type: "number",
	min: 1,
	step: 1
};

const Select = styled.select`
	${noBorders};
	border-radius: 5px;
	background-color: #eee;

	option {
		background-color: #eee;
		border: none;
		outline: none;
	}

	${active};
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

	${active};
`;

const Label = styled(formStyle.Label)`
	${active};
`;

export default {
	Cell,
	Trigger,
	FloatingWrapper,
	NumberInput,
	Select,
	ActionBar,
	ClearButton,
	Label
};
