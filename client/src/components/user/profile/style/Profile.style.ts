import styled from "@emotion/styled";
import { menuDropdownStyle } from "@/lib/theme/components/containers/popover.style";

const Menu = styled.div`
   /* prevents the edges of the header from overflowing */
   overflow-x: hidden;

   ${menuDropdownStyle};
`;

export default {
	Menu,
};
