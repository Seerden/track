import { Unstyled } from "@/lib/theme/components/buttons";
import { font } from "@/lib/theme/font";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import { spacing, spacingValue } from "@/lib/theme/snippets/spacing";
import styled from "@emotion/styled";

const Menu = styled.div`
	${flex.column};
	margin-top: ${spacingValue.medium};
	margin-right: ${spacingValue.small};
	padding: ${spacingValue.large};
	${radius.large};
	font-size: ${font.size["0.93"]};

	color: #444;
	width: max-content;

	border: 2px solid #fff;
	outline: 2px solid #ccc;

	background-color: #f3f3f3;

	box-shadow:
		0 0.2rem 0.1rem 0 #bbb,
		0 0.3rem 1rem 0 #aaa;

	/* Have to target the first and second children, because the first one is
      the FloatingArrow. */
	& > *:not(:first-child):not(:nth-child(2)) {
		border-top: 2px solid #ddd;
	}
`;

// TODO: TRK-231: make this a span, and render it inside a <Link /> when using it.
const Link = styled.span`
	${flex.row};
	gap: ${spacingValue.medium};
	${radius.small};
	${spacing.padding.wide({ size: 0.2, ratio: 2.5 })}

	--highlight-color: ${(p) => p.theme.colors.purple.dark};
	border: 2px solid var(--highlight-color);
	color: var(--highlight-color);

	align-items: center;
	font-weight: 500;

	&:visited {
		font-weight: 600;
	}

	&:not(:nth-of-type(1)) {
		margin-top: ${spacingValue.small};
	}
`;

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

	color: #222;
	background-color: #fff;

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

	color: #000;
	max-width: 100px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	flex: 1;
`;

const TriggerButton = styled(Unstyled)`
	font-size: ${font.size["0.93"]};
	padding: ${spacingValue.small};

	color: #333;

	position: relative;
	width: max-content;
	border: 2px solid transparent;
	border-bottom-color: #ddd;
	box-shadow: 0 1.3rem 0 -1rem #ddd;

	&:hover,
	&:active,
	&:focus {
		${radius.medium};
		border-color: #ccc;
		box-shadow: 0 0.4rem 0.6rem -0.2rem #ccc;
		background-color: #e9e9e9;
	}
`;

export default {
	Menu,
	Link,
	MenuSectionHeader,
	MenuSection,
	LinkCards,
	LinkCard,
	TriggerButton
};
