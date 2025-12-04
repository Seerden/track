import styled from "@emotion/styled";
import { spacingValue } from "@/lib/theme/snippets/spacing";

const SettingsGrid = styled.div`
   display: grid;
   grid-template-columns: max-content min-content;
   gap: ${spacingValue.small};
   padding-inline-start: ${spacingValue.small};
`;

export default {
	SettingsGrid,
};
