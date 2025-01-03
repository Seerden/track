import { Action } from "@/lib/theme/components/buttons";
import styled from "styled-components";
import type { CSS } from "styled-components/dist/types";

const LinkIconButton = styled(Action.Default)<{ $size?: CSS.Properties["width"] }>`
	display: flex;
	justify-content: center;
	align-items: center;

	--size: ${(p) => p.$size ?? "35px"};

	@media (max-width: 768px) {
		--size: calc(0.7 * ${(p) => p.$size ?? "35px"});
	}

	min-width: var(--size);
	min-height: var(--size);
	border: 2px solid white;

	svg {
		color: black;
	}
`;

const MinimalLinkIconButton = styled(Action.Alternative)`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const LinkButtons = {
	Icon: LinkIconButton,
	IconMinimal: MinimalLinkIconButton
};

export default LinkButtons;
