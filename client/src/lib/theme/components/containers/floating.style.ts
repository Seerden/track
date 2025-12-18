import styled from "@emotion/styled";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import { spacingValue } from "@/lib/theme/snippets/spacing";

// TODO: put all other floating styles here, too.

const Wrapper = styled.div`
	${flex.row};
	flex-wrap: wrap;
	max-width: 500px;

	z-index: 10;

	padding: ${spacingValue.medium};
	outline: 3px solid var(--bg-5-2);
	${radius.largish};
	gap: ${spacingValue.small};

	background-color: ${(p) => p.theme.colors.background.main[3]};
	box-shadow:
		0 0 0.3rem 0 var(--bg-5-3),
		0 0.4rem 0 0 var(--bg-3-1);
`;

const Floating = {
	Wrapper,
};

export default Floating;
