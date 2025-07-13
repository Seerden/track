import ActionButtons from "@/lib/theme/components/buttons/Action";
import CellButtons from "@/lib/theme/components/buttons/Cell";
import {
	default as _UnstyledButton,
	default as UnstyledButton
} from "@/lib/theme/components/buttons/Unstyled";
import { getFontSize } from "@/lib/theme/font";
import { border } from "@/lib/theme/snippets/edge";
import { radius } from "@/lib/theme/snippets/radius";
import { spacing } from "@/lib/theme/snippets/spacing";
import styled from "@emotion/styled";

const SubmitDefault = styled(UnstyledButton)`
	/* TODO: remove this negative bottom margin and overwrite when necessary */
	margin-bottom: -1.5rem;
	margin-top: 0.3rem;

	align-self: center;
	width: max-content;
	font-size: ${(p) => getFontSize(p, 0.9)};
	background-color: #ddd;
	${radius.medium};
	${border.grey};
	${spacing.padding.wide({ size: 0.6, ratio: 2.5 })};

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

const Buttons = {
	Action: ActionButtons,
	Cell: CellButtons,
	Submit: {
		Default: SubmitDefault
	},
	Unstyled: _UnstyledButton
};

export default Buttons;
