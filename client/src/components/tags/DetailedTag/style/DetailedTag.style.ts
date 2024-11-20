import TagTreeBranch from "@/components/tags/DetailedTag/style/TagBranch.style";
import CardStyle from "@/lib/theme/components/Card.style";
import { flex } from "@/lib/theme/snippets/flex";
import styled from "styled-components";

const Wrapper = styled(CardStyle.Wrapper)`
	${flex.column}

	gap: 0.4rem;

	${TagTreeBranch.Branch} {
		align-self: center;
	}

	${CardStyle.Datetime} {
		align-self: flex-end;
	}
`;

export default {
	Wrapper
};
