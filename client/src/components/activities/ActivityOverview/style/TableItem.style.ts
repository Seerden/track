import styled from "@emotion/styled";
import { radius } from "@/lib/theme/snippets/radius";
import { subgridItem } from "@/lib/theme/snippets/subgrid";

// TODO: I'm keeping this here instead of extracting it to lib/theme because of
// the `$isTask` prop. Perhaps we can still put it in lib/theme as
// Table.Row/Table.Item and extend it as needed.
const Item = styled.div<{ $isTask: boolean }>`
	${subgridItem}
	${radius.small};

	background-color: ${(p) => p.theme.colors.background.main[1]};
`;

export default {
	Item,
};
