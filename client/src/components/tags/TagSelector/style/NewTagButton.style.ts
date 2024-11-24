import ActionButtons from "@/lib/theme/components/buttons/Action";
import styled, { css } from "styled-components";
import type { CSS } from "styled-components/dist/types";

const Button = styled(ActionButtons.Default)<{
	$absolute?: boolean;
	$size?: CSS.Properties["width"];
}>`
	--new-tag-button-size: ${(p) => p.$size ?? "30px"};
	min-width: var(--new-tag-button-size);
	min-height: var(--new-tag-button-size);

	color: white;

	${(p) =>
		p.$absolute &&
		css`
			position: absolute;
			top: 50%;
			right: -7px;
		`}
`;

Button.defaultProps = {
	type: "button"
};

export default {
	Button
};
