/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-compiler/react-compiler */
import type { DraggableSyntheticListeners } from "@dnd-kit/core";
import type { Transform } from "@dnd-kit/utilities";
import React, { useEffect } from "react";

import classNames from "classnames";
import styles from "./Item.module.scss";

export interface Props {
	dragOverlay?: boolean;
	color?: string;
	dragging?: boolean;
	height?: number;
	index?: number;
	fadeIn?: boolean;
	transform?: Transform | null;
	listeners?: DraggableSyntheticListeners;
	sorting?: boolean;
	style?: React.CSSProperties;
	transition?: string | null;
	wrapperStyle?: React.CSSProperties;
	value: React.ReactNode;
}

export const Item = React.memo(
	React.forwardRef<HTMLLIElement, Props>(
		(
			{
				color,
				dragOverlay,
				dragging,
				fadeIn,
				height,
				index,
				listeners,
				sorting,
				style,
				transition,
				transform,
				value,
				wrapperStyle,
				...props
			},
			ref
		) => {
			useEffect(() => {
				if (!dragOverlay) return;

				document.body.style.cursor = "grabbing";

				return () => {
					document.body.style.cursor = "";
				};
			}, [dragOverlay]);

			return (
				<li
					className={classNames(
						styles.Wrapper,
						fadeIn && styles.fadeIn,
						sorting && styles.sorting,
						dragOverlay && styles.dragOverlay
					)}
					style={
						{
							...wrapperStyle,
							transition: [transition, wrapperStyle?.transition]
								.filter(Boolean)
								.join(", "),
							"--translate-x": transform
								? `${Math.round(transform.x)}px`
								: undefined,
							"--translate-y": transform
								? `${Math.round(transform.y)}px`
								: undefined,
							"--scale-x": transform?.scaleX ? `${transform.scaleX}` : "1",
							"--scale-y": transform?.scaleY ? `${transform.scaleY}` : "1",
							"--index": index,
							"--color": color
						} as React.CSSProperties
					}
					ref={ref}
				>
					<div
						className={classNames(
							styles.Item,
							dragging && styles.dragging,
							dragOverlay && styles.dragOverlay,
							color && styles.color
						)}
						style={{
							boxShadow: dragOverlay ? "0 0.3rem 0.8rem 0 #ccc" : undefined,
							...style
						}}
						{...listeners}
						{...props}
						tabIndex={0}
					>
						{value}
					</div>
				</li>
			);
		}
	)
);
