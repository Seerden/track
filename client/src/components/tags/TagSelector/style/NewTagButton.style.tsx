import styled from "@emotion/styled";
import type { CSSProperties } from "react";
import Buttons from "@/lib/theme/components/buttons";

const Button = styled(Buttons.Action.Default)<{
	$size?: CSSProperties["width"];
}>`
	--new-tag-button-size: ${(p) => p.$size ?? "30px"};
	min-width: var(--new-tag-button-size);
	min-height: var(--new-tag-button-size);
`;

export default {
	Button,
};
