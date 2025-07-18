import type { CSSProperties, PropsWithChildren } from "react";
import S from "./Badge.style";

type BadgeProps = {
	title?: string;
	color?: CSSProperties["color"];
	height?: CSSProperties["height"];
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
