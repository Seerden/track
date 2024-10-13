import styled from "styled-components";

export const Tree = styled.ul`
	max-height: 900px;
	overflow-y: scroll;
	padding-right: 1rem;
	margin-right: -1rem;
	width: max-content;
	min-width: 350px;
	border: 2px solid #dfdfdf;
`;

export const Container = styled.div`
	max-width: 720px;
	display: flex;
	flex-direction: column;
	box-shadow:
		0.5rem 0.5rem 0 -0.3rem deepskyblue,
		0 0 0.8rem 0 #ccc;
	padding: 1rem 2rem;
	border-radius: 3px;
	margin: 3rem auto;
`;

const borderColors = ["#444", "#777", "#aaa", "#ddd"];
const colors = ["deepskyblue", "blueviolet", "darkorchid", "darkviolet", "indigo"];

export const Tag = styled.li<{ $level: number }>`
	display: flex;
	flex-direction: column;
	justify-content: center;
	list-style: none;
	/* margin-left: ${(p) => p.$level * 1}rem; */
	font-weight: ${(p) => (p.$level === 0 ? "bold" : "normal")};
	border-left: 3px solid
		${(p) => (p.$level === 0 ? "transparent " : colors[(p.$level - 1) % colors.length])};

	/* :not(:nth-of-type(1)) {
		margin-top: 0.5rem; // might look better without this
	} */

	margin-bottom: ${(p) => (p.$level == 0 ? "1.5rem" : "0")};
`;

export const Children = styled.ul`
	margin-left: 1.5rem;
	/* margin-right: 1.5rem; // might look better with this.  */

	${Tag} {
		&:nth-last-of-type(1) {
			margin-bottom: 0.5rem;
		}
	}
`;

export const TagName = styled.label<{ $level: number }>`
	font-size: 0.9rem;

	${(p) =>
		p.as === "label" &&
		`
      cursor: pointer;
   `}

	${(p) =>
		p.as === "span" &&
		`
      cursor: default;
      user-select: none;
   `}

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	gap: 0.5rem;
	margin: 0.3rem 0.5rem;
	padding: 0.5rem 0.7rem;
	outline: 2px solid #eee;
	border-radius: 4px;
	box-shadow: 0.6rem 0.6rem 0 -0.3rem #ddd;

	background-color: ${(p) =>
		p.$level === 0 ? "deepskyblue" : colors[p.$level % colors.length]};
	color: white;
	max-height: max-content;
`;

export const DropdownCheckbox = styled.input`
	display: none;
`;
