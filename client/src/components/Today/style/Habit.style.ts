import { Unstyled } from "@/lib/theme/components/buttons";
import ListStyle from "@/lib/theme/components/List.style";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import styled from "@emotion/styled";

const Wrapper = styled(ListStyle.Item)`
	max-width: 500px; /* TODO: this is temporary, needs to become responsive */
	cursor: unset; /* Because the default ListItem has cursor: pointer. */
`;

const CompletionWrapper = styled.div`
	${flex.row};
	align-items: center;
	justify-self: flex-end;

	gap: ${spacingValue.medium};

	width: 100%;
	min-width: 150px;
`;

const ExpandButton = styled(Unstyled)<{ $size?: number }>`
	${flex.centered};
	justify-self: center;

	--size: ${(p) => p.$size ?? 30}px;
	width: var(--size);
	height: var(--size);

	${radius.round};

	background-color: #fff;

	transition: all 40ms linear;
	&:hover {
		/* TODO: lucide.ts */
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
