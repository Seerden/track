/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-compiler/react-compiler */
import type { DraggableSyntheticListeners } from "@dnd-kit/core";
import type { Transform } from "@dnd-kit/utilities";
import type { PropsWithChildren } from "react";
import React, { useEffect } from "react";

import classNames from "classnames";
import styles from "./Item.module.scss";
import S from "./style/DragItem.style";

type StyleProps = {
	color?: string;
	index?: number;
	transition?: string | null;
	wrapperStyle?: React.CSSProperties;
	transform?: Transform | null;
};

export interface Props extends StyleProps {
	dragOverlay?: boolean;
	dragging?: boolean;
	height?: number;
	fadeIn?: boolean;
	listeners?: DraggableSyntheticListeners;
	sorting?: boolean;
	style?: React.CSSProperties;
	value: React.ReactNode;
}

function getItemWrapperStyle({
	wrapperStyle,
	transition,
	transform,
	index,
	color
}: StyleProps) {
	return {
		...wrapperStyle,
		transition,
		"--translate-x": transform ? `${Math.round(transform.x)}px` : undefined,
		"--translate-y": transform ? `${Math.round(transform.y)}px` : undefined,
		"--scale-x": transform?.scaleX ? `${transform.scaleX}` : "1",
		"--scale-y": transform?.scaleY ? `${transform.scaleY}` : "1",
		"--index": index,
		"--color": color
	} as React.CSSProperties;
}

const DragItem = React.memo(
	React.forwardRef<HTMLLIElement, PropsWithChildren<Props>>(
		(
			{
				children,
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
				<S.Wrapper
					className={classNames(
						styles.Wrapper,
						fadeIn && styles.fadeIn,
						sorting && styles.sorting,
						dragOverlay && styles.dragOverlay
					)}
					style={getItemWrapperStyle({
						wrapperStyle,
						color,
						index,
						transition,
						transform
					})}
					ref={ref}
				>
					<S.Item
						className={classNames(
							styles.Item,
							dragging && styles.dragging,
							dragOverlay && styles.dragOverlay,
							color && styles.color
						)}
						style={style}
						{...listeners}
						{...props}
						tabIndex={0}
					>
						{children ? children : value}
					</S.Item>
				</S.Wrapper>
			);
		}
	)
);

export default DragItem;
