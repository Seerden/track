import styled from "styled-components";

const List = styled.ul<{ $itemCount: number }>`
	width: 100%;
	display: grid;
	gap: 0.8rem;
	grid-template-columns: repeat(
		${(p) => p.$itemCount},
		calc(100% / ${(p) => p.$itemCount} - 0.8rem)
	);
`;

export default { List };
