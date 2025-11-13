import styled from "@emotion/styled";
import Buttons from "@/lib/theme/components/buttons";
import ActionButtons from "@/lib/theme/components/buttons/Action";
import { outline } from "@/lib/theme/snippets/edge";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import { spacing } from "@/lib/theme/snippets/spacing";

const NavBar = styled.nav`
	position: fixed;
	top: 0;

	background-color: #eee;

	width: 100%;

	${spacing.padding.wide({ size: 1.5, ratio: 2 })};
	z-index: 99;

	border-bottom: 2px solid #666;

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
	${outline.secondary};

	min-width: 40px;
	min-height: 35px;

	background-color: #f9f9f9; // TODO TRK-231: theme value
	box-shadow: 0 0.3rem 0.3rem -0.1rem #bbb;

	svg {
		color: #333;
	}

	&:hover,
	&:active,
	&:focus {
		${outline.tertiary};
		background-color: #eee;
		box-shadow: 0 0.3rem 0.3rem -0.2rem #bbb;
		transform: translateY(2px);
	}

	&:focus,
	&:active {
		outline-color: #ccc;
	}
`;

const MenuTrigger = styled(Buttons.Unstyled)`
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
