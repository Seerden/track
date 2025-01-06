import { spacing } from "@/lib/theme/snippets/spacing";
import styled from "styled-components";

const Empty = styled.p`
	background-color: #ddd;
	box-shadow: 0 0.2rem 0.5rem 0 #ccc;

	${spacing.padding.wide({ size: 0.5, ratio: 2 })};
	border-radius: 3px;
	max-width: max-content;
`;

export default {
	Empty
};
