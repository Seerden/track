import { flex } from "@/lib/theme/snippets/flex";
import { spacing } from "@/lib/theme/snippets/spacing";
import styled from "styled-components";

// TODO: rename to TaskField
const Task = styled.label`
	cursor: pointer;

	${flex.row};
	align-items: center;
	padding: 0 1rem;
	gap: 0.2rem;

	background-color: #eaeaea;
	${spacing.margin.wide({ size: 0.2, ratio: 2.5 })}
	border: 2px solid white;
	border-radius: 3px;

	input[type="checkbox"] {
		width: 0;
	}

	svg {
		max-height: 100%;
		width: 27px;
		display: flex;
		align-self: center;
		justify-self: center;

		&.on {
			color: ${(p) => p.theme.colors.green.main};
		}

		&.off {
			color: #ccc;
		}
	}

	&:active,
	&:hover,
	&:focus-within {
		svg {
			&.on {
				color: limegreen;
			}
			&.off {
				color: #bbb;
			}
		}
	}
`;

export default {
	Task
};
