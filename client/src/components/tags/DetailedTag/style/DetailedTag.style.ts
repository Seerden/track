import styled from "@emotion/styled";
import TagTreeBranch from "@/components/tags/DetailedTag/style/TagBranch.style";
import Card from "@/lib/theme/components/Card.style";
import { flex } from "@/lib/theme/snippets/flex";

const Wrapper = styled(Card.Wrapper)`
	${flex.column}

	gap: 0.4rem;

	${TagTreeBranch.Branch} {
		align-self: center;
	}

	${Card.Datetime} {
		align-self: flex-end;
	}
`;

export default {
	Wrapper,
};
