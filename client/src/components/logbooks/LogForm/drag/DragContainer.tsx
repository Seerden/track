/* eslint-disable @typescript-eslint/no-explicit-any */
import classnames from "classnames";
import React, { forwardRef } from "react";
import styles from "./Container.module.scss";

export interface Props {
	children: React.ReactNode;
	columns?: number;
	label?: string;
	style?: React.CSSProperties;
	horizontal?: boolean;
	scrollable?: boolean;
	shadow?: boolean;
	unstyled?: boolean;
	onClick?(): void;
}

export const Container = forwardRef<HTMLDivElement, Props>(
	(
		{
			children,
			columns = 1,
			horizontal,
			onClick,
			label,
			style,
			scrollable,
			shadow,
			unstyled,
			...props
		}: Props,
		ref
	) => {
		const Component = onClick ? "button" : "div";

		return (
			<Component
				className={classnames(
					styles.Container,
					unstyled && styles.unstyled,
					horizontal && styles.horizontal,
					scrollable && styles.scrollable,
					shadow && styles.shadow
				)}
				{...props}
				ref={ref as React.Ref<any>}
				style={
					{
						...style,
						"--columns": columns
					} as React.CSSProperties
				}
				onClick={onClick}
				tabIndex={onClick ? 0 : undefined}
			>
				{label ? <div className={styles.Header}>{label}</div> : null}
				<ul>{children}</ul>
			</Component>
		);
	}
);
