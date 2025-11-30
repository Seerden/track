import styled from "@emotion/styled";
import { flex } from "@/lib/theme/snippets/flex";
import { spacingValue } from "@/lib/theme/snippets/spacing";

/** @usage this is the action bar we use in Detail modals, it houses the edit,
 * delete and close buttons. */
const DetailModal = styled.div`
   position: absolute;
   top: -1rem;
   right: 6rem;
   ${flex.row};
   gap: ${spacingValue.medium};
   justify-content: flex-end;
`;

export const ActionBar = { DetailModal };
