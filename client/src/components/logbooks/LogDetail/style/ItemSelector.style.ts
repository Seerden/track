import { flex } from "@/lib/theme/snippets/flex";
import styled from "styled-components";

const Wrapper = styled.div`
	${flex.column};
	flex-wrap: wrap;
	max-width: 100%;

	@media (min-width: 1080px) {
		max-width: 500px;
	}

	gap: 0.5rem;
	padding: 0.5rem;

	// TODO: remove
	outline: 2px solid red;
`;

const Items = styled.div`
	${flex.row};
	gap: 0.5rem;
`;

export default {
	Wrapper,
	Items
};
