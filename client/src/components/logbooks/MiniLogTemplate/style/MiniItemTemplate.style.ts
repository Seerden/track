import { flex } from "@/lib/theme/snippets/flex";
import scrollbar from "@/lib/theme/snippets/scroll";
import styled from "styled-components";

const Wrapper = styled.li`
	padding: 0.5rem 1rem;

	max-width: 300px;

	&:not(:nth-of-type(1)) {
		border-top: 2px solid #ccc;
	}
`;

const Header = styled.div`
	width: 100%;
	${flex.row};
	justify-content: space-between;
	align-items: center;
`;

const Title = styled.h2`
	margin: 0;
	font-size: 1rem;
`;

const Description = styled.p`
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;

	margin-bottom: 0.5rem;
`;

const ChipList = styled.ul`
	list-style: none;

	${flex.row};
	flex-wrap: nowrap;
	max-width: 100%;
	overflow-x: auto;

	padding-bottom: 0.3rem;

	gap: 0.5rem;

	${scrollbar.custom};

	&::-webkit-scrollbar-button {
		width: 0;
	}

	&::-webkit-scrollbar {
		height: 8px;
	}
`;

const Chip = styled.li`
	border-radius: 5px;
	background-color: #ddd;

	min-width: max-content;
	padding: 0.4rem;
	overflow: hidden;

	${flex.column};
`;

const FieldMeta = styled.div`
	${flex.row};

	font-size: 0.9rem;
	gap: 3px;

	* {
		background-color: #eee;
		outline: 1px solid #ddd;
		padding: 0.15rem 0.3rem;
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
