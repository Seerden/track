import _commonStyle from "@/components/logbooks/Logbooks/style/_common.style";
import { flex } from "@/lib/theme/snippets/flex";
import { spacing } from "@/lib/theme/snippets/spacing";
import styled from "styled-components";

// TODO: listItem gets a subgrid, and in the parent, we set grid columns to
// max-content * however many fields we have

const ListItem = styled.li`
	${flex.row};
	gap: 1rem;
	width: max-content;

	${_commonStyle.cardShadow};
	${_commonStyle.outline.secondary};
	${_commonStyle.radius.small}

	${spacing.padding.wide({ size: 0.5, ratio: 2 })}
`;

const LabelAndValue = styled.li`
	list-style: none;

	${flex.column};
`;

export default { ListItem, LabelAndValue };
