import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Buttons from "@/lib/theme/components/buttons";
import { font } from "@/lib/theme/font";
import Input from "@/lib/theme/input";
import { lightDark } from "@/lib/theme/light-dark";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import { spacing, spacingValue } from "@/lib/theme/snippets/spacing";

const Wrapper = styled.div<{ $fullSize?: boolean }>`
	position: relative;
	min-width: 100%;
	margin-top: 0.8rem;

	padding: 1rem;
	z-index: 3;
	${flex.column};

	max-width: ${(p) => (p.$fullSize ? "100%" : "400px")};

	min-height: 130px; // TODO: this is hardcoded for the current size to prevent layout shift -- should be dynamic
   
   border: 1px solid var(--bg-5-3);
	box-shadow: 0.6rem 0.6rem 0 -0.5rem ${(p) => p.theme.colors.dark[4]};

   background-color: var(--bg-1-2);
`;

const List = styled.ul`
	${flex.row};
	background-color: var(--bg-0-1);
;
	flex-wrap: wrap;

	gap: 0.5rem;

	${spacing.padding.wide({ size: 0.8, ratio: 1.5 })};
	min-height: 3.6rem; // this currently is the exact size of a single item; prevents layout shift when going from items -> no items
	max-height: 250px;
	overflow-y: scroll;

	justify-content: stretch;
`;

const ListItem = styled.li<{ $hasParent?: boolean; $isSelected?: boolean }>`
	display: flex;
	flex: 1;
	min-width: max-content;
	justify-content: center;
	border: 2px solid #ccc;
	${radius.small};
	box-shadow: 0.2rem 0.1rem 0 0 var(--bg-5-4);
	${spacing.padding.wide({ size: 0.2, ratio: 2.5 })};
	font-size: ${font.size["0.82"]};
	min-height: calc(4px + 1.24rem); // should be font-size + padding + border
	height: max-content;

	list-style-type: none;
	cursor: pointer;
	user-select: none;

	&:hover {
		${(p) =>
			!p.$isSelected &&
			css`
				background-color: ${p.theme.colors.background.main[3]};
				border-color: ${p.theme.colors.blue.main};
				box-shadow: 0.3rem 0.3rem 0 -0.1rem ${p.theme.colors.blue.main};
			`}
	}

	${(p) =>
		!p.$hasParent
			? css`
					box-shadow: 0.2rem 0.2rem 0rem -0.1rem var(--bg-4-3);
					background-color: ${p.theme.colors.background.main[3]};
				`
			: css``};

	${(p) =>
		p.$isSelected &&
		css`
			border-color: azure;
			color: ${p.theme.colors.darkGreen.main};
			font-weight: 500;
			background-color: ${p.theme.colors.green.secondary};
			box-shadow: 0.3rem 0.3rem 0 -0.1rem ${p.theme.colors.green.secondary};
		`}

   transition: all 35ms linear;
`;

const ClearFilter = styled(Buttons.Action.Default)`
	position: absolute;
	right: 0.3rem;

	padding: 0.2rem;
	margin-top: 0.05rem;

	--size: 20px;
	width: var(--size);
   min-width: var(--size);
	height: var(--size);
   min-height: var(--size);
`;

const FilterWrapper = styled.div`
	position: relative;

	${flex.row};
	align-items: center;
	justify-content: center;

	gap: 0;
`;

const Actions = styled.div`
	${flex.row};
	justify-content: space-between;
	align-items: flex-end;
	gap: 1rem;
	width: 100%;

	& > button:nth-of-type(1) {
		margin-left: auto;
	}
`;

const DropdownActions = styled.div`
	${flex.row};
	align-items: flex-end;
	justify-content: space-between;

	gap: 1rem;

	${spacing.margin.wide({ size: 0.8, ratio: 1.25 })}

	button:nth-of-type(1) {
		margin-left: auto;
	}

	${Actions} {
		justify-content: flex-start;
		align-items: flex-start;

		& > ${Input.Filter} {
			align-self: flex-start;
		}
	}
`;

const DropdownContent = styled.div`
   --inline-offset: 1.1rem;

	position: absolute;
	top: -0.92rem;
	left: calc(-1 * var(--inline-offset));

	${flex.column};

	background-color: ${(p) => p.theme.colors.background.main[3]};
	border: 2px solid var(--bg-5-4);;
	${radius.medium};

	box-shadow:
		0.2rem 0.2rem 0 0 ${(p) => lightDark(p, p.theme.colors.background.contrast[2], p.theme.colors.background.main[1])},
		0 0 0.6rem 0 ${(p) => lightDark(p, p.theme.colors.background.contrast[5], p.theme.colors.background.main[1])};

	width: calc(
		100% + calc(2 * var(--inline-offset))
	); // 100% plus twice the left offset to center it against its parent
`;

const SelectionList = styled.ul`
	${flex.row};
	flex-wrap: wrap;
	align-items: center;

	padding: 0.2rem 0;
	padding-right: 0.4rem; // this is to prevent make scrollbar look better
	${spacing.margin.tall({ size: 0.4, ratio: 2 })}
	gap: 0.5rem;
	font-size: ${font.size["0.85"]};

	user-select: none;
	max-height: 120px;
	overflow-y: scroll;
`;

const SelectionItem = styled.li`
	${flex.centered};
	flex: 1;

	list-style: none;
	${spacing.padding.wide({ size: 0.3, ratio: 1.5 })};
	min-width: max-content;
	${radius.small};
	background-color: ${(p) => p.theme.colors.blue.main};
	color: white;
	box-shadow: 0rem 0.2rem 0rem 0 ${(p) => p.theme.colors.darkBlue.main};
`;

const PathPart = styled.span<{ $isLeaf: boolean }>`
	color: ${(p) => (p.$isLeaf ? "white" : "lightblue")};
	${(p) =>
		!p.$isLeaf &&
		css`
			max-width: 75px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		`}
`;

const EmptySelection = styled.div`
	${spacing.padding.wide({ size: 0.4, ratio: 2.5 })};
	color: azure;
	background-color: ${(p) => p.theme.colors.blue.main};
	max-width: max-content;
	margin-top: ${spacingValue.small};
`;

const CreateTagButton = styled(Buttons.Unstyled)`
	${flex.column};
	justify-content: center;
	align-items: center;

	gap: ${spacingValue.medium};
	padding: ${spacingValue.small};

	width: 100%;
	height: max-content;

	text-decoration: underline;

	background-color: ${(p) => p.theme.colors.blue.main};
	color: white;

	border: none;
`;

export default {
	Wrapper,
	List,
	ListItem,
	ClearFilter,
	FilterWrapper,
	Actions,
	DropdownActions,
	DropdownContent,
	SelectionList,
	SelectionItem,
	PathPart,
	EmptySelection,
	CreateTagButton,
};
