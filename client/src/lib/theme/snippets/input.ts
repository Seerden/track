import { css } from "@emotion/react";
import type { MainTheme } from "@/lib/style/theme";
import { font } from "@/lib/theme/font";
import { noBorders } from "@/lib/theme/snippets/border";
import { radius } from "@/lib/theme/snippets/radius";
import { spacing } from "@/lib/theme/snippets/spacing";

export const inputStyle = ({ theme }: { theme: MainTheme }) =>
	css`
      caret-color: ${theme.colors.background.main[0]};

      --font-size: ${font.size[0.93]};
      font-size: var(--font-size);

      &:not([type="date"]) {
         line-height: var(--font-size);
      }

      ${noBorders};
      ${spacing.padding.wide({ size: 0.3, ratio: 1.5 })};
      
      ${radius.small};
      border-radius: 0 0 3px 3px;

      color: ${theme.colors.text.main[0]};
      background-color: ${theme.colors.background.main[theme.mode === "light" ? 0 : 2]};

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
         -webkit-appearance: none;
         margin: 0;  
      }

      &[type=number] {
         -moz-appearance: textfield;
         appearance: textfield;
      }
`;
