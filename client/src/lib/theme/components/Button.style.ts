import { getMainColor, getSecondaryColor, type ColorKey } from "@/lib/theme/colors";
import { unstyledButton } from "@/lib/theme/snippets/button";
import styled from "styled-components";
import type { CSS } from "styled-components/dist/types";

const Unstyled = styled.button`
	${unstyledButton};

	cursor: pointer;
`;

Unstyled.defaultProps = { type: "button" };

const Edit = styled(Unstyled)<{ $size?: CSS.Properties["width"]; $color: ColorKey }>`
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	color: white;

	outline: 2px solid ${(p) => getMainColor(p.theme, p.$color)};
	border: 2px solid #eee;
	box-shadow: 0 0.2rem 0.5rem 0 #bbb;
	background-color: ${(p) => getMainColor(p.theme, p.$color)};

	svg {
		color: white;
	}

	&:hover {
		outline: 2px solid ${(p) => getSecondaryColor(p.theme, p.$color)};
		background-color: ${(p) => getSecondaryColor(p.theme, p.$color)};
		border-radius: 5px;
	}

	transition: all linear 50ms;

	--default-edit-button-size: 35px;
	width: ${(p) => p.$size ?? "var(--default-edit-button-size)"};
	height: ${(p) => p.$size ?? "var(--default-edit-button-size)"};
`;

Edit.defaultProps = {
	$color: "themeInverted"
};

/** TODO: I'm calling this Create right now, but it's really just an Action button, so
 * it'll be renamed soon enough. */
const Create = styled(Edit)`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export default {
	Unstyled,
	Edit,
	Create
};
