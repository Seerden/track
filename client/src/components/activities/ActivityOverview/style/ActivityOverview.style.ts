import {
	itemAndHeaderFieldStyle,
	itemAndHeaderStyle
} from "@/components/activities/ActivityOverview/style/TableItem.style";
import { Action } from "@/lib/theme/components/buttons";
import { outline, thickOutline } from "@/lib/theme/snippets/edge";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import { spacing, spacingValue } from "@/lib/theme/snippets/spacing";
import styled from "@emotion/styled";

const OverviewWrapper = styled.div`
	width: 100%;
	padding-top: 1rem;
`;

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: max-content 250px repeat(4, auto);

	@media (max-width: 1080px) {
		grid-template-columns: min-content auto repeat(4, auto);
	}
`;

const FloatingWrapper = styled.div`
	margin-top: ${spacingValue.medium};
	${spacing.padding.medium};
	${radius.large};
	margin-left: ${spacingValue.small};

	z-index: 2;

	${outline.primary};
	background-color: #fff;
	--highlight: ${(p) => p.theme.colors.darkBlue.main};
	border: 2px solid var(--highlight);
	box-shadow: 0 0 1rem -0.2rem var(--highlight);
`;

const Header = styled.div`
	position: sticky;
	top: 0;

	margin: ${spacingValue.small} 0;
	padding: ${spacingValue.small} 0;
	${radius.small}

	background-color: #333;
	${outline.tertiary};
	box-shadow: 0 0 0.3rem 0 #ccc;
	color: #eee;

	${itemAndHeaderStyle};
`;

const HeaderField = styled.div`
	text-align: start;

	${itemAndHeaderFieldStyle};

	@media (max-width: 768px) {
		max-width: 50px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
`;

const ActionBar = styled.div`
	${flex.row};
	${spacing.padding.wide({ size: 0.5, ratio: 2 })}
	${radius.small};
	gap: ${spacingValue.small};
	margin-bottom: ${spacingValue.medium};
	${thickOutline.greyer};

	width: max-content;

	background-color: #eee;
	box-shadow: 0 0.3rem 0.5rem -0.1rem #333;

	position: sticky;
	z-index: 2;
	top: 1.5rem;
`;

const ActionButton = styled(Action.Alternative)`
	background-color: #fff;
`;

export default {
	OverviewWrapper,
	Wrapper,
	FloatingWrapper,
	Header,
	HeaderField,
	ActionBar,
	ActionButton
};
