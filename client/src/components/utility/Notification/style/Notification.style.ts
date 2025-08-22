import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { NotificationType } from "@/components/utility/Notification/Notification";
import type { MainTheme } from "@/lib/style/theme";
import { radius } from "@/lib/theme/snippets/radius";
import { spacing } from "@/lib/theme/snippets/spacing";

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
	${spacing.padding.wide({ size: 1, ratio: 2 })}
	${radius.largish};
	border: 2px solid #fff;

	--main: ${(p) => getNotificationColor(p.theme, p.$type)};
	--contrast: ${(p) => p.theme.colors.tint.white};

	${(p) =>
		p.$invert
			? css`
					outline: 1px solid var(--main);
					box-shadow: 1.1rem 1.1rem 0.4rem -0.9rem var(--contrast);
					background-color: var(--contrast);
					color: var(--main);
				`
			: css`
					outline: 1px solid var(--contrast);
					box-shadow: 1.1rem 1.1rem 0.4rem -0.9rem var(--main);
					background-color: var(--main);
					color: var(--contrast);
				`}

	overflow: hidden;
	z-index: 10;
`;

export default {
	Container,
};
