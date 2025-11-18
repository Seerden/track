import styled from "@emotion/styled";
import Buttons from "@/lib/theme/components/buttons";
import { font } from "@/lib/theme/font";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import { spacingValue } from "@/lib/theme/snippets/spacing";

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

	font-size: ${font.size["0.82"]};
`;

const SpeedDialButton = styled(Buttons.Action.DefaultText)`
	width: 100%;
	padding-inline: ${spacingValue.medium};
	${radius.medium};

   &:focus, &:active, &:hover {
      box-shadow: 0 0.3rem 0 0 var(--color-background), 0 0.4rem 0.8rem -0.4rem var(--color-background-active);
      transform: translateY(-2px);
   }
`;

export default {
	Create,
	SpeedDialActions,
	SpeedDialButton,
};
