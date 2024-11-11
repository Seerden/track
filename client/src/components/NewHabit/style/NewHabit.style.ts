import StyledButtons from "@/lib/theme/components/Button.style";
import styled from "styled-components";

const ClearEndDateButton = styled(StyledButtons.Unstyled)`
	cursor: pointer;
	background-color: ${(p) => p.theme.colors.red.secondary};
	box-shadow: 0 0 0.4rem 0 #aaa;
	padding: 0.3rem;
	border-radius: 50%;

	display: flex;
	align-items: center;
	height: max-content;
	width: max-content;

	outline: 2px solid azure;
	&:hover,
	&:focus,
	&:active {
		outline: 2px solid azure;
		box-shadow:
			0 0.2rem 0 0 ${(p) => p.theme.colors.red.main},
			0 0 0.2rem 0 #555;
		transform: translateY(2px);
		background-color: ${(p) => p.theme.colors.red.main};
	}
`;

const SetEndDateButton = styled(StyledButtons.Unstyled)`
	font-size: 0.85rem;
	align-self: center;
	padding: 0.5rem;
	border-radius: 3px;
	background-color: #fff;
	outline: 2px solid #ddd;
	box-shadow: 0 0.1rem 0.3rem 0 #aaa;
	margin-right: 1rem;
	cursor: pointer;

	&:hover {
		background-color: #eee;
		outline: 2px solid #aaa;
		transform: translateY(2px);
	}
`;

export default {
	ClearEndDateButton,
	SetEndDateButton
};
