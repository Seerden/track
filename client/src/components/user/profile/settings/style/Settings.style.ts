import styled from "@emotion/styled";
import Containers from "@/lib/theme/components/container.style";
import { spacingValue } from "@/lib/theme/snippets/spacing";

const Wrapper = styled(Containers.Column)`
   padding: ${spacingValue.medium};
`;

const SettingsGrid = styled.div`
   display: grid;
   grid-template-columns: max-content min-content;
   gap: ${spacingValue.small};
`;

export default {
	Wrapper,
	SettingsGrid,
};
