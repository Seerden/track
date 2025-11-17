import styled from "@emotion/styled";
import { colors } from "@/lib/theme/colors";
import ActionButtons from "@/lib/theme/components/buttons/Action";

const Default = styled(ActionButtons.MinimalPlus)`
   justify-self: center;
   align-self: center;

   --color: ${colors.light[0]}
`;

const Submit = {
	Default,
};

export default Submit;
