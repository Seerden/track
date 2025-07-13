import Buttons from "@/lib/theme/components/buttons";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import styled from "@emotion/styled";

// TODO: responsive styling. On small viewports, maybe render it statically in
// the header, instead of as a SpeedDial.
const Create = styled.div`
	position: fixed;
	bottom: 10rem;
	right: 10rem;
	z-index: 100;
`;

const SpeedDialActions = styled.div`
	${flex.column};
	${flex.centered};

	gap: ${spacingValue.small};
	padding: 0 ${spacingValue.medium};
	${radius.small};

	font-size: 0.8rem;
`;

const SpeedDialButton = styled(Buttons.Action.Stylized)`
	width: 100%;
	padding-inline: ${spacingValue.medium};
	${radius.medium}
`;

export default {
	Create,
	SpeedDialActions,
	SpeedDialButton
};
