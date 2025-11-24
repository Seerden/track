import { css } from "@emotion/react";
import { itemSizeCss } from "@/lib/theme/components/List.style";

/** not really a generic "column", but represents some columns of Today.tsx
 * (Tasks, Notes, Habits) */
export const column = css`
	@media (width >= 1280px) {
		min-width: 500px;
	}

   @media (width < 720px) {
      min-width: 100%;
   }

   ${itemSizeCss};
`;
