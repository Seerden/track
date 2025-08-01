import ListStyle from "@/lib/theme/components/List.style";
import { flex } from "@/lib/theme/snippets/flex";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import styled from "@emotion/styled";

const Wrapper = styled(ListStyle.Item)`
	position: relative;

	display: grid;
	grid-template-columns: 100px 150px 1fr;

	max-width: 500px; /* TODO: this is temporary, needs to become responsive */
	cursor: unset; /* Because the default ListItem has cursor: pointer. */
`;

const CompletionWrapper = styled.div`
	${flex.row};
	align-items: center;
	justify-self: flex-end;

	gap: ${spacingValue.medium};

	min-width: 150px;
`;

export default {
	Wrapper,
	CompletionWrapper
};
