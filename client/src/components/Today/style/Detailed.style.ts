import styled from "@emotion/styled";
import { flex } from "@/lib/theme/snippets/flex";
import { spacingValue } from "@/lib/theme/snippets/spacing";

const ActionBar = styled.div`
   position: absolute;
   top: -1rem;
   right: 6rem;
   ${flex.row};
   gap: ${spacingValue.medium};
   justify-content: flex-end;
`;

export default { ActionBar };
