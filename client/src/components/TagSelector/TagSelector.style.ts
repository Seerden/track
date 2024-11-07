import { getFontSize } from "@/lib/theme/font";
import styled, { css } from "styled-components";

const Wrapper = styled.div<{ $fullSize?: boolean }>`
	position: relative;
	min-width: 100%;
	margin-top: 0.8rem;

	box-shadow: 0 0 0.5rem 0 #ccc;

	padding: 1rem 1.2rem;
	z-index: 3;
	display: flex;
	flex-direction: column;

	max-width: ${(p) => (p.$fullSize ? "100%" : "400px")};

	min-height: 130px; // TODO: this is hardcoded for the current size to prevent layout shift -- should be dynamic
`;

const List = styled.ul`
	display: flex;
	background-color: #fff;
	flex-direction: row;
	flex-wrap: wrap;

	gap: 0.5rem;

	box-shadow: 0 0 0.5rem 0 #ccc;
	padding: 0.8rem 1.2rem;
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
	border-radius: 2px;
	box-shadow: 0.2rem 0.1rem 0 0 #ddd;
	padding: 0.2rem 0.6rem;
	font-size: ${(p) => getFontSize(p, 0.82)};
	min-height: calc(4px + 1.24rem); // should be font-size + padding + border
	height: max-content;

	list-style-type: none;
	cursor: pointer;
	user-select: none;

	&:hover {
		${(p) =>
			!p.$isSelected &&
			css`
				background-color: #eee;
				border-color: deepskyblue;
				box-shadow: 0.3rem 0.3rem 0 -0.1rem deepskyblue;
			`}
	}

	${(props) =>
		!props.$hasParent
			? css`
					box-shadow: 0rem 0.2rem 0rem 0rem #aaa;
					background-color: #f2f2f2;
				`
			: css``};

	${(props) =>
		props.$isSelected &&
		css`
			border-color: azure;
			color: #143516;
			font-weight: 500;
			background-color: limegreen;
			box-shadow: 0.3rem 0.3rem 0 -0.1rem limegreen;
		`}
`;

const Title = styled.h3`
	margin: 0;

	padding: 0.35rem 0.75rem;
	margin-top: -1.6rem;
	margin-left: 0.5rem;
	background-color: #333;
	color: azure;
	max-width: max-content;
	font-size: ${(p) => getFontSize(p, 1.1)};

	border-radius: 3px;
	border: 2px solid #777;
`;

const Filter = styled.input`
	display: flex;
	padding: 0.2rem 0.4rem;
	border-radius: 3px;
	outline: 2px solid #ccc;
	box-shadow: 0.1rem 0.1rem 0 0 #ddd;
	border: none;
	align-self: flex-end;
	max-width: 150px;

	--font-size: ${(p) => getFontSize(p, 0.88)};
	font-size: var(--font-size);
	line-height: var(--font-size);

	&:focus {
		outline-color: ${(p) => p.theme.colors.blue.main};
		box-shadow: 0rem 0.5rem 0.2rem -0.2rem #ccc;
	}
`;

const ClearFilter = styled.button`
	position: absolute;
	border: none;
	display: flex;
	right: 0.1rem;
	align-items: center;
	justify-content: center;
	background-color: #aaa;
	border-radius: 40%;
	padding: 0.22em;
	cursor: pointer;
	color: white;
	align-self: center;
	width: 20px;
	height: 20px;

	&:hover {
		background-color: deepskyblue;
		color: white;
		border-radius: 50%;
	}
`;

ClearFilter.defaultProps = {
	type: "button"
};

const FilterWrapper = styled.div`
	position: relative;
	display: flex;
	flex-direction: row;
	gap: 0;
	align-items: center;
	justify-content: center;
`;

const Actions = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-top: 0.3rem;
	gap: 0.5rem;

	button:nth-of-type(1) {
		margin-left: auto;
	}
`;

const Dropdown = styled.div`
	position: relative;
`;

const DropdownTrigger = styled.button`
	border-radius: 50%;
	width: 30px;
	height: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0px;
	outline: none;
	border: none;

	&:active {
		transform: scale(1.1);
		background-color: white;
		& > svg {
			fill: black;
		}
	}

	&:focus:not(:active) {
		outline: 2px solid ${(p) => p.theme.colors.blue.main};
		background-color: #fff;
	}

	&:hover {
		background-color: #fafafa;
		box-shadow: 0 0.2rem 0.5rem 0 #999;
	}
`;

DropdownTrigger.defaultProps = {
	type: "button"
};

const DropdownActions = styled.div`
	display: flex;
	flex-direction: row;
	gap: 1rem;
	align-items: flex-end;
	margin: 0.8rem 1rem;
	justify-content: space-between;

	button:nth-of-type(1) {
		margin-left: auto;
	}

	${Actions} {
		justify-content: flex-start;
		align-items: flex-start;

		& > ${Filter} {
			align-self: flex-start;
		}
	}
`;

const DropdownContent = styled.div`
	position: absolute;
	top: -0.8rem;
	left: -1.1rem;
	display: flex;
	flex-direction: column;
	background-color: #eee;
	border: 2px solid #ddd;
	border-radius: 4px;
	box-shadow:
		0.2rem 0.2rem 0 0 #333,
		0 0 0.6rem 0 #999;
	width: calc(
		100% + 2.2rem
	); // 100% plus twice the left offset to center it against its parent
`;

const SelectionList = styled.ul`
	padding: 0.2rem 0;
	margin: 0.7rem 0.4rem;
	display: flex;
	padding-right: 0.4rem; // this is to prevent make scrollbar look better
	flex-direction: row;
	flex-wrap: wrap;
	gap: 0.5rem;
	font-size: ${(p) => getFontSize(p, 0.85)};
	align-items: center;
	user-select: none;
	max-height: 120px;
	overflow-y: scroll;
`;

const SelectionItem = styled.li`
	list-style: none;
	display: flex;
	padding: 0.3rem 0.5rem;
	min-width: max-content;
	flex: 1;
	border-radius: 4px;
	background-color: ${(p) => p.theme.colors.blue.main};
	color: white;
	justify-content: center;
	align-items: center;
	box-shadow: 0rem 0.2rem 0.2rem #ccc;
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
	padding: 0.4rem 1.2rem;
	color: azure;
	background-color: ${(p) => p.theme.colors.blue.main};
	max-width: max-content;
	margin-top: 0.5rem;
`;

export default {
	Wrapper,
	List,
	ListItem,
	Title,
	Filter,
	ClearFilter,
	FilterWrapper,
	Actions,
	Dropdown,
	DropdownTrigger,
	DropdownActions,
	DropdownContent,
	SelectionList,
	SelectionItem,
	PathPart,
	EmptySelection
};
