import styled from "@emotion/styled";
import { thickOutline } from "@/lib/theme/snippets/edge";
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
	${thickOutline.grey};
	${radius.largish};
	gap: ${spacingValue.small};

	background-color: ${(p) => p.theme.colors.background.main[3]};
	box-shadow:
		0 0 0.3rem 0 #777,
		0 0.4rem 0 0 #ccc;
`;

const Floating = {
	Wrapper,
};

export default Floating;
