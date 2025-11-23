import styled from "@emotion/styled";
import { flex } from "@/lib/theme/snippets/flex";
import { spacingValue } from "@/lib/theme/snippets/spacing";

const TagSelectionList = styled.div`
	${flex.row};
	flex-wrap: wrap;
	gap: ${spacingValue.small};
	margin-top: ${spacingValue.small};
	max-width: 450px; // TODO: I just hardcoded this to match the 'action bar' for now, but this should be responsive
`;

export default {
	TagSelectionList,
};
