import styled from "@emotion/styled";
import type { CSSProperties } from "react";
import { colors } from "@/lib/theme/colors";
import Buttons from "@/lib/theme/components/buttons";
import { menuDropdownStyle } from "@/lib/theme/components/containers/popover.style";
import { font } from "@/lib/theme/font";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import { spacing, spacingValue } from "@/lib/theme/snippets/spacing";

const Menu = styled.div`
	${flex.column};
	/* margin-top: ${spacingValue.medium}; */
	/* margin-right: ${spacingValue.small}; */
	padding: ${spacingValue.large};
	font-size: ${font.size["0.93"]};

   ${menuDropdownStyle};

	width: max-content;
`;

// TODO: TRK-231: make this a span, and render it inside a <Link /> when using it.
const Link = styled.span`
	${flex.row};
	gap: ${spacingValue.medium};
	${radius.small};
	${spacing.padding.wide({ size: 0.2, ratio: 2.5 })}

	--highlight-color: ${(p) => p.theme.colors.purple.dark};

   background-color: var(--highlight-color);
	color: ${colors.light[1]};

	align-items: center;
	font-weight: 500;

	&:visited {
		font-weight: 600;
	}

	&:not(:nth-of-type(1)) {
		margin-top: ${spacingValue.small};
	}
`;

export const profileLinkStyles: CSSProperties = {
	maxWidth: "max-content",
	margin: spacingValue.small,
	marginBottom: 0,
	justifySelf: "flex-end",
};

const MenuSection = styled.div`
	${flex.column};

	gap: 0.4rem;

	&:not(:nth-of-type(1)) {
		margin-top: ${spacingValue.large};
		padding-top: ${spacingValue.large};
	}
`;

const MenuSectionHeader = styled.span`
	${flex.row};
	${radius.medium};
	${spacing.padding.wide({ size: 0.2, ratio: 3 })};
	font-size: ${font.size["1"]};
	gap: ${spacingValue.medium};
	margin-left: calc(-1 * ${spacingValue.small});

	color: #${(p) => p.theme.colors.text.main[2]};
	background-color: ${(p) => p.theme.colors.background.main[0]};
;

	width: max-content;
	align-items: center;

	svg {
		color: ${(p) => p.theme.colors.orange.main};
	}
`;

const LinkCards = styled.div`
	${flex.row};
	gap: ${spacingValue.medium};

	list-style: none;
	max-width: 220px; // TODO: this is pretty arbitrary
	overflow-x: auto;
	flex-wrap: nowrap;
`;

const LinkCard = styled.span`
	padding: ${spacingValue.small};
	${radius.small};
	background-color: ${(p) => p.theme.colors.orange.main};

   /* TODO: is this unused? */
	color: ${(p) => p.theme.colors.text.main[0]};
	max-width: 100px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	flex: 1;
`;

const TriggerButton = styled(Buttons.Unstyled)`
	font-size: ${font.size["0.93"]};
	padding: ${spacingValue.small};

	color: ${(p) => p.theme.colors.text.main[3]};

	position: relative;
	width: max-content;
	border: 2px solid transparent;
	
   --shadow-color: var(--bg-4-3);
   --secondary-background-color: var(--bg-5-2);

   border-bottom-color: var(--shadow-color);

   --shadow: 0 1.3rem 0 -1rem var(--shadow-color);
	box-shadow: var(--shadow);

	&:hover,
	&:active,
	&:focus {
		${radius.medium};
		border-color: var(--secondary-background-color);
		box-shadow: var(--shadow), 0 0.4rem 0.6rem -0.2rem var(--secondary-background-color);
		background-color: ${(p) => p.theme.colors.background.main[0]};
	}
`;

export default {
	Menu,
	Link,
	MenuSectionHeader,
	MenuSection,
	LinkCards,
	LinkCard,
	TriggerButton,
};
