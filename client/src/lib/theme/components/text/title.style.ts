import styled from "@emotion/styled";
import { flex } from "@/lib/theme/snippets/flex";
import { spacingValue } from "@/lib/theme/snippets/spacing";

const MenuHeader = styled.h1`
   --color: ${(p) => p.theme.colors.blue.main};
   font-size: ${(p) => p.theme.font.size["1.1"]};

   /* TODO: should override the default marign for headings */
   margin-block: 0;
   padding: ${spacingValue.medium};
   border-bottom: 1px solid var(--color);
   color: #fff;

   background-color: var(--color);

   ${flex.row};
   align-items: center;
   gap: ${spacingValue.small};

   span {
      padding-top: 2px;
   }

   .lucide {
      color: #fff;
   }
`;

const MenuSectionHeader = styled.h2`
   --size: ${(p) => p.theme.font.size["1.02"]};
   font-size: var(--size);
   line-height: var(--size);
   margin-bottom: ${spacingValue.smallest};
`;

const MenuSubsectionHeader = styled.h3`
   --size: ${(p) => p.theme.font.size["0.93"]};
   font-size: var(--size);
   line-height: var(--size);
   font-weight: 400;

   color: #111;
`;

export const Title = {
	Menu: {
		Header: MenuHeader,
		SectionHeader: MenuSectionHeader,
		SubsectionHeader: MenuSubsectionHeader,
	},
};
