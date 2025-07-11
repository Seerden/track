import { Action } from "@/lib/theme/components/buttons";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { CSSProperties } from "react";

const _Button = styled(Action.Default)<{
	$absolute?: boolean;
	$size?: CSSProperties["width"];
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
