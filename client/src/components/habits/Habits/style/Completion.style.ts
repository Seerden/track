import { flex } from "@/lib/theme/snippets/flex";
import styled from "styled-components";

const List = styled.ul<{ $itemCount: number }>`
	width: 100%;
	gap: 0.8rem;

	${flex.row};

	flex-wrap: nowrap;
`;

export default { List };
