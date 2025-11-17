import styled from "@emotion/styled";
import { font } from "../../font";
import { border } from "../../snippets/edge";
import { radius } from "../../snippets/radius";
import { spacing } from "../../snippets/spacing";
import UnstyledButton from "./Unstyled";

const Default = styled(UnstyledButton)`
	/* TODO: remove this negative bottom margin and overwrite when necessary */
	margin-bottom: -1.5rem;
	margin-top: 0.3rem;

	align-self: center;
	width: max-content;
	font-size: ${font.size["0.9"]};;
	background-color: ${(p) => p.theme.colors.background.main[4]};
	${radius.medium};
	${border.grey};
	${spacing.padding.wide({ size: 0.6, ratio: 2.5 })};

	&:not(&:disabled) {
		box-shadow:
			0.1rem 0.1rem 0 0 white,
			0.5rem 0.5rem 0 0 ${(p) => p.theme.colors.blue.main};
	}

	&:hover,
	&:focus,
	&:active {
		background-color: ${(p) => p.theme.colors.background.main[0]};
;
		transform: translateY(-2px);
		border-color: ${(p) => p.theme.colors.blue.main};
		box-shadow: 0.5rem 0.6rem 0 0 ${(p) => p.theme.colors.blue.main};
	}
`;

const Submit = {
	Default,
};

export default Submit;
