import type { PropsWithChildren } from "react";
import type { CSS } from "styled-components/dist/types";
import S from "./Badge.style";

type BadgeProps = {
	title?: string;
	color?: CSS.Properties["color"];
	height?: CSS.Properties["height"];
};

export default function Badge({
	title,
	height,
	color,
	children
}: PropsWithChildren<BadgeProps>) {
	return (
		<S.Badge title={title} height={height} color={color}>
			{children}
		</S.Badge>
	);
}
