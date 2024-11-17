import ListStyle from "@/lib/theme/components/List.style";
import { flex } from "@/lib/theme/snippets/flex";
import styled from "styled-components";

const Wrapper = styled(ListStyle.Item)`
	max-width: 500px; // TODO: this is temporary, needs to become responsive
`;

const CompletionWrapper = styled.div`
	${flex.row};
	justify-self: flex-end;
	align-items: center;
	gap: 1rem;

	width: 100%;
`;

export default {
	Wrapper,
	CompletionWrapper
};
