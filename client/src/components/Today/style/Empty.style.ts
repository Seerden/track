import styled from "styled-components";

const Empty = styled.p`
	background-color: ${(p) => p.theme.colors.highlight.info};
	color: ${(p) => p.theme.colors.white};
	padding: 0.5rem 1rem;
	border-radius: 3px;
`;

export default {
	Empty
};
