import type { NotificationType } from "@/components/utility/Notification/Notification";
import type { MainTheme } from "@/lib/theme/theme";
import styled from "styled-components";

function getMainColor(theme: MainTheme, type: NotificationType) {
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
	--main: ${(p) => (p.$invert ? "#fff" : getMainColor(p.theme, p.$type))};
	--contrast: ${(p) =>
		p.$invert ? getMainColor(p.theme, p.$type) : p.theme.colors.tint.white};
	border: 2px solid #fff;
	outline: 1px solid var(--main);
	box-shadow: 1.1rem 1.1rem 0.4rem -0.9rem var(--main);
	background-color: var(--main);
	color: var(--contrast);
	overflow: hidden;
	z-index: 10;
`;

const Bar = styled.div`
	// bar that has width equal to $percentage
	position: absolute;
	content: "";
	bottom: 5px;
	left: 5px;
	height: 3px;
	background-color: var(--contrast);
	z-index: 100;
	border-radius: 5px;
`;

export default {
	Container,
	Bar
};
