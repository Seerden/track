import styled from "@emotion/styled";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import { spacing, spacingValue } from "@/lib/theme/snippets/spacing";

const CalendarHeader = styled.div`
   ${flex.row};
   gap: ${spacingValue.small};
   align-items: center;

`;

const CalendarTitle = styled.h2`
   min-width: max-content;
   user-select: none;
   background-color: ${(p) => p.theme.colors.background.main[1]};
   ${spacing.padding.wide({ size: 0.2, ratio: 2 })};
   box-shadow: 0 0.3rem 0.2rem -0.2rem var(--bg-5-2);
   ${radius.small};
   border-bottom: 2px solid var(--bg-4-3);
   color: ${(p) => p.theme.colors.text.main[3]};
   font-size: ${(p) => p.theme.font.size["0.85"]};
`;

export default { CalendarHeader, CalendarTitle };
