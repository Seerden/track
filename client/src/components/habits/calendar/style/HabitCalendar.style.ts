import styled from "@emotion/styled";
import { flex } from "@/lib/theme/snippets/flex";
import { spacingValue } from "@/lib/theme/snippets/spacing";

const CalendarHeader = styled.div`
   ${flex.row};
   gap: ${spacingValue.small};
   align-items: center;

`;

export default { CalendarHeader };
