import { css } from "@emotion/react";
import styled from "@emotion/styled";
import ActionButtons from "@/lib/theme/components/buttons/Action";
import { lightDark } from "@/lib/theme/light-dark";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import { spacing } from "@/lib/theme/snippets/spacing";

const NavBar = styled.nav`
	position: fixed;
	top: 0;

   --base-background-color: ${(p) => (p.theme.mode === "light" ? p.theme.colors.background.main[1] : p.theme.colors.background.body)};

	background-color: color-mix(in srgb, var(--base-background-color), transparent 10%);
   backdrop-filter: blur(10px);

	width: 100dvw;

	${spacing.padding.wide({ size: 1.5, ratio: 2 })};
	z-index: 99;

	border-bottom: 2px solid #555;

	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 2rem;
`;

const Actions = styled.div`
	${flex.row};
	align-items: center;

	gap: 3rem;
`;

// TODO (TRK-139): replaced this with another button, so this can probably be removed.
const Action = styled(ActionButtons.Default)`
	margin-left: auto;
	${radius.medium};

	${spacing.padding.wide({ size: 0.5, ratio: 3 })};

	// Override defaults from the generic default Action button
	width: max-content;
	height: max-content;
`;

/**
 * @note this is a `span` to circumvent typing issues with styled-components and
 * the Link component.
 */
const HomeLink = styled.span`
	${flex.centered};
	${radius.medium};
	
   outline: 2px solid ${(p) => lightDark(p, p.theme.colors.light[3], p.theme.colors.dark[2])};

	min-width: 40px;
	min-height: 35px;

	background-color: ${(p) => p.theme.colors.background.main[1]}; // TODO TRK-231: theme value

   --highlight-color: ${(p) => lightDark(p, p.theme.colors.light[5], p.theme.colors.dark[1])};
	box-shadow: 0 0.3rem 0.3rem -0.1rem var(--highlight-color);;

	svg {
		color: ${(p) => p.theme.colors.text.main[3]};
	}

	&:hover,
	&:active,
	&:focus {
		outline: 2px solid ${(p) => lightDark(p, p.theme.colors.light[4], "inherit")};
      ${(p) =>
				p.theme.mode === "light" &&
				css`
               background-color: ${p.theme.colors.background.main[4]};
            `}
		box-shadow: 0 0.3rem 0.3rem -0.2rem var(--highlight-color);
		transform: translateY(2px);
	}

	&:focus,
	&:active {
		outline-color: #ccc;
	}
`;

const MenuTrigger = styled.span`
   cursor: pointer;
   display: flex;

   &:hover, &:focus {
      .lucide {
         color: ${(p) => p.theme.colors.blue.secondary};
      }
   }
   
   &[aria-expanded="true"] {
      .lucide {
         color: ${(p) => p.theme.colors.blue.main};
      }
   }
`;

export default {
	HomeLink,
	NavBar,
	Actions,
	Action,
	MenuTrigger,
};
