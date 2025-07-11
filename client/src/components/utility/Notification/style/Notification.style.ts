import type { NotificationType } from "@/components/utility/Notification/Notification";
import type { MainTheme } from "@/lib/style/theme";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

function getNotificationColor(theme: MainTheme, type: NotificationType) {
	switch (type) {
		case "error":
			return theme.colors.red.main;
		case "success":
			return theme.colors.green.main;
		case "warning":
			return theme.colors.orange.main;
		case "info":
			return theme.colors.blue.main;
		default:
			return theme.colors.tint.black;
	}
}

const Container = styled.div<{
	$invert?: boolean;
	$type: NotificationType;
	$percentage?: number;
}>`
	position: fixed;
	top: 6rem;
	left: 1rem;
	padding: 1rem 2rem;
	border-radius: 0.5rem;
	border: 2px solid #fff;

	--main: ${(p) => getNotificationColor(p.theme, p.$type)};
	--contrast: ${(p) => p.theme.colors.tint.white};

	outline: 1px solid ${(p) => (p.$invert ? css`var(--main)` : css`var(--contrast)`)};
	box-shadow: 1.1rem 1.1rem 0.4rem -0.9rem ${(p) => (p.$invert ? css`var(--contrast)` : css`var(--main)`)};
	background-color: ${(p) => (p.$invert ? css`var(--contrast)` : css`var(--main)`)};
	color: ${(p) => (p.$invert ? css`var(--main)` : css`var(--contrast)`)};

	overflow: hidden;
	z-index: 10;
`;

export default {
	Container
};
