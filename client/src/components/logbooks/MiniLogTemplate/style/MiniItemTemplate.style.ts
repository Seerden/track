import { flex } from "@/lib/theme/snippets/flex";
import styled from "styled-components";

const Wrapper = styled.li`
	// dev styles
	border: 2px solid blue;
	margin: 0.5rem;

	width: max-content;
`;

const Header = styled.div`
	width: 100%;
	${flex.row};
	justify-content: space-between;
`;

const Title = styled.h2`
	margin: 0;
	font-size: 1rem;
`;

const Description = styled.p`
	height: 1.5rem;
	line-height: 1.5rem;
`;

const ChipList = styled.ul`
	list-style: none;

	${flex.row};
	flex-wrap: wrap;

	gap: 0.5rem;
`;

const Chip = styled.li`
	width: max-content;

	border-radius: 5px;
	background-color: #ddd;
	padding: 0.2rem 0.4rem;

	${flex.column};
`;

const FieldMeta = styled.div`
	${flex.row};
	gap: 0.2rem;

	font-size: 0.9rem;

	* {
		background-color: white;
		padding: 0.15rem 0.3rem;
		border-radius: 5px;
	}
`;

const Standalone = styled.div`
	cursor: help;

	.lucide {
		color: #333;
		border-radius: 5px;
		padding: 0.2rem;
	}
`;

export default {
	Wrapper,
	Header,
	Title,
	Description,
	ChipList,
	Chip,
	FieldMeta,
	Standalone
};
