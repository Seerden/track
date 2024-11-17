import { getFontSize } from "@/lib/theme/font";
import { flex } from "@/lib/theme/snippets/flex";
import { spacing } from "@/lib/theme/snippets/spacing";
import styled from "styled-components";

const Wrapper = styled.div`
	margin: 1.2rem auto;
	${spacing.padding.wide({ size: 1.2, ratio: 1.5 })};

	box-shadow: 0 0 1rem 0 #aaa;
	max-width: 720px;
	border: 2px solid #aaa;
`;

const List = styled.ul`
	${flex.column};
	gap: 0.5rem;
`;

const Item = styled.li`
	position: relative;
	${spacing.padding.wide({ size: 0.8, ratio: 1.5 })};
	box-shadow: 0 0 0.3rem 0 #ccc;

	list-style: none;

	min-width: 400px; // TODO: make this responsive
`;

const Name = styled.h2`
	font-size: ${(p) => getFontSize(p, 1.35)};
	margin-bottom: 0.2rem;
	border-bottom: 2px solid darkorchid;
	width: max-content;
	${spacing.padding.wide({ size: 0.2, ratio: 5 })};
	background-color: darkorchid;
	border-radius: 2px;
	color: azure;
	margin-bottom: 0;
`;

const Dates = styled.div`
	font-size: ${(p) => getFontSize(p, 0.8)};

	${flex.column};
	align-items: flex-end;
`;

const Title = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Description = styled.section`
	box-shadow:
		0.3rem 0.3rem 0 -0.1rem #ccc,
		0 0 0.5rem 0 #ccc;
	/* background-color: #e1e1e1; */
	padding: 0.6rem;
	margin: 1rem;
	max-width: 400px;
	border-radius: 3px;

	border-radius: 3px;
`;

const Date = styled.span``;

const Tag = styled.div`
	margin-top: 0.4rem;
	${spacing.padding.wide({ size: 0.2, ratio: 3 })};
	background-color: gold;
	color: black;
	font-size: ${(p) => p.theme.font.size["0.9"]};
	width: max-content;
	border-radius: 3px;
`;

const checkboxSize = `25px`;

const Checkbox = styled.input`
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

const Tags = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.3rem;
	justify-content: flex-end;
`;

export default {
	Wrapper,
	List,
	Item,
	Name,
	Dates,
	Title,
	Description,
	Date,
	Tag,
	Checkbox,
	Tags
};
