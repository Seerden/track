import Buttons from "@/lib/theme/components/buttons/buttons";
import UnstyledInput from "@/lib/theme/components/input/UnstyledInput.style";
import { noBorders } from "@/lib/theme/snippets/border";

import styled from "styled-components";

/* Shared styles for DayOfWeekSelector and DayOfMonthSelector, because they're
basically the same thing. */

const Cell = styled(Buttons.Unstyled)`
	font-size: 0.85rem;
	display: flex;
	width: 22px;
	height: 22px;
	margin: 4px;
	justify-content: center;
	align-items: center;
	border-radius: 3px;
	background-color: #dfdfdf;
`;

const Trigger = styled(Buttons.Unstyled)`
	padding: 0.3rem;
	border: 1px solid #ccc;
	border-radius: 8px;
	margin-top: 0.3rem;
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
	width: 40px;
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
	background-color: #eee;

	option {
		background-color: #eee;
		border: none;
		outline: none;
	}
`;

export default {
	Cell,
	Trigger,
	FloatingWrapper,
	NumberInput,
	Select
};
