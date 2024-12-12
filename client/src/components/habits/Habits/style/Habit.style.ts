import { Unstyled } from "@/lib/theme/components/buttons";
import ListStyle from "@/lib/theme/components/List.style";
import { flex } from "@/lib/theme/snippets/flex";
import styled from "styled-components";

const Wrapper = styled(ListStyle.Item)`
	max-width: 500px; /* TODO: this is temporary, needs to become responsive */
	cursor: unset; /* Because the default ListItem has cursor: pointer. */
`;

const CompletionWrapper = styled.div`
	${flex.row};
	justify-self: flex-end;
	align-items: center;
	gap: 1rem;

	width: 100%;
	min-width: 150px;
`;

const ExpandButton = styled(Unstyled)<{ $size?: number }>`
	--size: ${(p) => p.$size ?? 30}px;
	width: var(--size);
	height: var(--size);

	border-radius: 50%;
	justify-self: center;
	display: flex;
	align-items: center;
	justify-content: center;

	background-color: #fff;

	transition: all 40ms linear;
	&:hover {
		svg {
			color: ${(p) => p.theme.colors.blue.main};
			transform: scale(1.2);
		}
	}

	svg {
		color: #333;
	}
`;

export default {
	Wrapper,
	CompletionWrapper,
	ExpandButton
};
