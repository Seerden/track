import styled, { css } from "styled-components";

export const Wrapper = styled.div<{ $fullSize?: boolean }>`
	position: relative;
	min-width: 100%;
	margin-top: 0.8rem;
	border: 2px solid #ccc;
	padding: 0.3rem 0.4rem;
	z-index: 3;
	display: flex;
	flex-direction: column;

	max-width: ${(p) => (p.$fullSize ? "100%" : "400px")};

	min-height: 75px;
`;

export const List = styled.ul`
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

export const ListItem = styled.li<{ $hasParent?: boolean; $isSelected?: boolean }>`
	display: flex;
	flex: 1;
	min-width: max-content;
	justify-content: center;
	border: 2px solid #ccc;
	border-radius: 2px;
	box-shadow: 0.2rem 0.1rem 0 0 #ddd;
	padding: 0.2rem 0.6rem;
	font-size: 0.82rem;
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

export const Title = styled.h3`
	margin: 0;

	padding: 0.35rem 0.75rem;
	margin-top: -1.1rem;
	margin-left: 0.5rem;
	background-color: #333;
	color: azure;
	max-width: max-content;
	font-size: 1.1rem;

	border-radius: 3px;
	border: 2px solid #777;
`;

export const Filter = styled.input`
	display: flex;
	padding: 0.2rem 0.4rem;
	border-radius: 3px;
	border: 2px solid #ccc;
	box-shadow: 0.1rem 0.1rem 0 0 #ddd;
	align-self: flex-end;
	max-width: 150px;

	font-size: 0.88rem;
`;

export const Actions = styled.div`
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

export const Dropdown = styled.div`
	position: relative;
`;

export const DropdownTrigger = styled.button`
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
		outline: 2px solid dodgerblue;
		background-color: #fff;
	}

	&:hover {
		background-color: #fafafa;
		box-shadow: 0 0.2rem 0.5rem 0 #999;
	}
`;

DropdownTrigger.defaultProps = {
	type: "button",
};

export const DropdownActions = styled.div`
	display: flex;
	flex-direction: row;
	gap: 1rem;
	align-items: flex-end;
	margin: 1rem;
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

export const DropdownContent = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	background-color: #eee;
	border: 2px solid #ddd;
	border-radius: 4px;
	box-shadow:
		0.2rem 0.2rem 0 0 #333,
		0 0 0.6rem 0 #999;
	width: 100%;
`;

export const SelectionList = styled.ul`
	padding: 0.2rem 0;
	margin: 0.7rem 0.4rem;
	display: flex;
	padding-right: 0.4rem; // this is to prevent horizontal
	flex-direction: row;
	flex-wrap: wrap;
	gap: 0.5rem;
	font-size: 0.85rem;
	align-items: center;
	user-select: none;
	max-height: 120px;
	overflow-y: scroll;
`;

export const SelectionItem = styled.li`
	list-style: none;
	display: flex;
	padding: 0.3rem 0.5rem;
	min-width: max-content;
	flex: 1;
	border-radius: 4px;
	background-color: dodgerblue;
	color: white;
	justify-content: center;
	align-items: center;
	box-shadow: 0rem 0.2rem 0.2rem #ccc;
`;

export const PathPart = styled.span<{ $isLeaf: boolean }>`
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
