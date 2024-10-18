import styled, { css } from "styled-components";

export const Wrapper = styled.div<{ $fullSize?: boolean }>`
	position: relative;
	min-width: 100%;
	margin-top: 0.8rem;
	border: 2px solid #ccc;
	padding: 0.3rem 0.4rem;
	display: flex;
	flex-direction: column;

	max-width: ${(p) => (p.$fullSize ? "100%" : "400px")};
`;

export const List = styled.ul`
	display: flex;
	background-color: #fff;
	flex-direction: row;
	flex-wrap: wrap;

	gap: 0.5rem;
	/* margin-top: 0.3rem; */

	/* box-shadow: 0 0 0.5rem 0 #ccc; */
	padding: 0.8rem 1.2rem;
	min-height: 3.6rem; // this currently is the exact size of a single item; prevents layout shift when going from items -> no items

	justify-content: stretch;
`;

export const ListItem = styled.li<{ $hasParent?: boolean; $isSelected?: boolean }>`
	width: max-content;
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

	${DropdownTrigger} {
		&:nth-of-type(1) {
			margin-left: auto;
		}
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
