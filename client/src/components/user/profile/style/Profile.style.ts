import styled from "@emotion/styled";
import { menuDropdownStyle } from "@/lib/theme/components/containers/popover.style";
import { spacingValue } from "@/lib/theme/snippets/spacing";

const SettingsGrid = styled.div`
   display: grid;
   grid-template-columns: max-content min-content;
   gap: ${spacingValue.small};
   padding-inline-start: ${spacingValue.small};
`;

const Menu = styled.div`
   /* prevents the edges of the header from overflowing */
   overflow-x: hidden;

   ${menuDropdownStyle};
`;

export default {
	SettingsGrid,
	Menu,
};
