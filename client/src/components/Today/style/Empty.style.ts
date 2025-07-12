import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import { spacing } from "@/lib/theme/snippets/spacing";
import styled from "@emotion/styled";

const Empty = styled.p`
	background-color: #ddd;
	box-shadow: 0 0.4rem 0.2rem -0.3rem #bbb;

	${spacing.padding.wide({ size: 0.5, ratio: 2 })};
	${radius.small};
	max-width: max-content;

	${flex.column};
	gap: 0.5rem;

	button {
		color: #666;
	}
`;

export default {
	Empty
};
