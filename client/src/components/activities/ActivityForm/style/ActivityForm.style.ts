import styled from "@emotion/styled";
import { border } from "@/lib/theme/snippets/edge";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import { spacing } from "@/lib/theme/snippets/spacing";

// TODO: rename to TaskField
const Task = styled.label`
	cursor: pointer;

	${flex.row};
	align-items: center;

	${border.primary};
	${radius.small};

	${spacing.margin.wide({ size: 0.2, ratio: 2.5 })}
	padding: 0 1rem;
	gap: 0.2rem;

	background-color: #eaeaea;
`;

export default {
	Task,
};
