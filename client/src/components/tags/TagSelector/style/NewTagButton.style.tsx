import { Action } from "@/lib/theme/components/buttons";
import styled, { css } from "styled-components";
import type { CSS } from "styled-components/dist/types";

const _Button = styled(Action.Default)<{
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

function Button(props: Parameters<typeof _Button>[0]) {
	return <_Button {...props} type="button" />;
}

export default {
	Button
};
