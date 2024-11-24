import { Unstyled } from "@/lib/theme/components/buttons";
import { getFontSize } from "@/lib/theme/font";
import { spacing } from "@/lib/theme/snippets/spacing";
import styled from "styled-components";

const Default = styled(Unstyled)`
	cursor: pointer;
	${spacing.padding.wide({ size: 0.6, ratio: 2.5 })};
	margin-bottom: -1.5rem;
	margin-top: 0.3rem;
	align-self: center;
	width: max-content;
	font-size: ${(p) => getFontSize(p, 0.9)};
	background-color: #ddd;
	border-radius: 5px;
	border: 2px solid #ccc;
	box-shadow:
		0.1rem 0.1rem 0 0 white,
		0.5rem 0.5rem 0 0 ${(p) => p.theme.colors.blue.main};

	&:hover,
	&:focus,
	&:active {
		background-color: #fff;
		transform: translateY(-2px);
		border-color: ${(p) => p.theme.colors.blue.main};
		box-shadow: 0.5rem 0.6rem 0 0 ${(p) => p.theme.colors.blue.main};
	}
`;

Default.defaultProps = {
	type: "submit"
};

const SubmitButtons = {
	Default
};

export default SubmitButtons;
