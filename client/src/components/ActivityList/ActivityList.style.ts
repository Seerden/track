import styled from "styled-components";

export const Wrapper = styled.div`
	margin: 1.2rem auto;

	padding: 1.2rem 2rem;
	box-shadow: 0 0 1rem 0 #aaa;
	max-width: 720px;
	border: 2px solid #aaa;
`;

export const List = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export const Item = styled.li`
	position: relative;
	padding: 0.8rem 1.2rem;
	box-shadow: 0 0 0.3rem 0 #ccc;

	list-style: none;

	min-width: 400px; // TODO: make this responsive
`;

export const Name = styled.h2`
	font-size: ${(p) => getFontSize(p, 1.35)};
	margin-bottom: 0.2rem;
	border-bottom: 2px solid darkorchid;
	width: max-content;
	padding: 0.1rem 1rem;
	background-color: darkorchid;
	border-radius: 2px;
	color: azure;
	margin-bottom: 0;
`;

export const Dates = styled.div`
	font-size: ${(p) => getFontSize(p, 0.8)};
	display: flex;
	flex-direction: column;
	align-items: flex-end;
`;

export const Title = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const Description = styled.section`
	box-shadow:
		0.3rem 0.3rem 0 -0.1rem #ccc,
		0 0 0.5rem 0 #ccc;
	/* background-color: #e1e1e1; */
	padding: 0.7rem 0.5rem;
	margin: 1rem;
	max-width: 400px;
	border-radius: 3px;

	border-radius: 3px;
`;

export const Date = styled.span``;

export const Tag = styled.div`
	margin-top: 0.4rem;
	padding: 0.2rem 0.6rem;
	background-color: gold;
	color: black;
	font-size: ${(p) => p.theme.font.size["0.9"]};
	width: max-content;
	border-radius: 3px;
`;

const checkboxSize = `25px`;

export const Checkbox = styled.input`
	position: absolute;
	top: 50%;
	right: -10px;
	height: ${checkboxSize};
	width: ${checkboxSize};
	border: 2px solid darkorange;
	outline: none;
	padding: none;
	appearance: none;
	background-color: white;
	border-radius: 5px;

	transition: all 25ms ease-out;

	&:checked {
		--color: ${(p) => p.theme.colors.green.main};
		accent-color: var(--color);
		background-color: var(--color);
		border-color: var(--color);
	}

	&:hover {
		border-color: slategrey;
		background-color: white;
	}
`;

export const Tags = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.3rem;
	justify-content: flex-end;
`;
