import styled from "@emotion/styled";
import SettingsStyle from "@/components/user/profile/settings/style/Settings.style";
import Containers from "@/lib/theme/components/container.style";
import { Title } from "@/lib/theme/components/text/title.style";
import { font } from "@/lib/theme/font";
import { flex } from "@/lib/theme/snippets/flex";
import { spacingValue } from "@/lib/theme/snippets/spacing";

const Wrapper = styled(Containers.Column)`
   padding: 1rem 2.5rem;

   /** This limits content width and centers it. Should be generalized. I think
   * We should just be using page.tsx styles. */
   @media (width > 768px) {
      width: 100%;
      max-width: 800px; 
   }

   justify-self: center;
   
   /** 5.4rem is the height of the Navbar (TODO) define navbar height in theme
    * or as a constant. */
   margin-top: calc(5.4rem + ${spacingValue.medium});
   border-radius: 3px;
   background-color: var(--bg-2-1);
   box-shadow: 0 0.3rem 0.3rem 0 var(--bg-2-1),
      0 0.3rem 0.4rem -0.2rem var(--bg-3-4);

   ${SettingsStyle.Wrapper} {
      background-color: var(--bg-3-2);
   }

   /** This targets the "Account information", "Update settings" and "Settings"
    * headings. */ 
   ${Title.Menu.SectionHeader} {
      --size: ${font.size["1.1"]};
      line-height: 1.2;
   }

`;

const Header = styled.h1`
   display: flex;
   align-items: center;
   gap: ${spacingValue.medium};
   padding-bottom: ${spacingValue.small};
   border-bottom: 3px solid var(--bg-3-4);
   border-radius: 3px;
   margin-bottom: ${spacingValue.larger};
   box-shadow: 0 0.6rem 0 -0.45rem var(--bg-3-4);
`;

const Sections = styled(Containers.Row)`
   justify-content: space-between;

   /** We have two sections, Account Information and Settings. This gives both
    * some breathing room, which we need since we're overwriting the background
    * color of Settings and it looks bad without padding. */
   > * {
      padding: 1rem;
   }

   @media (width < 768px) {
      flex-direction: column;
      gap: ${spacingValue.medium};
   }
`;

const Actions = styled.ul`
   list-style: none;

   li {
      button {
         width: 100%;
         justify-content: start;
         align-items: start;
         text-align: start;
      }
   }

   width: max-content;
   ${flex.column};
   gap: ${spacingValue.medium};
`;

const Datum = styled(Containers.Column)`
   outline: 2px solid var(--bg-3-2);
   background-color: var(--bg-3-2);
   padding: 0.3rem 0.5rem;
   gap: 0.1rem;

   width: 100%;
   max-width: 250px;
   box-shadow: 0.5rem 0.5rem 0 -0.35rem var(--bg-3-4);

   div {
      display: flex;

      &:first-of-type {
         background-color: ${(p) => p.theme.colors.background.main[3]};
         width: max-content;
         padding: 0.3rem 0.6rem;
         border-radius: 2px;
         z-index: 3;
         margin-top: -1.2rem;
         margin-left: -1.5rem;
         color: ${(p) => p.theme.colors.text.main[3]};
         font-style: italic;
         font-size: ${font.size["0.85"]};
      }

      &:nth-of-type(2) {
         padding-top: 0.3rem;
         ${flex.row};
         justify-content: space-between;
      }
   }
`;

export default {
	Wrapper,
	Header,
	Sections,
	Actions,
	Datum,
};
