import { css } from "styled-components";

const edgeSizes = [1, 2, 3, 5] as const;

type EdgeSizeMap = {
	[Size in (typeof edgeSizes)[number]]: `${Size}px`;
};

const size = edgeSizes.reduce((acc, size) => {
	(acc as Record<number, string>)[size] = `${size}px`;
	return acc;
}, {} as EdgeSizeMap);

export const edge = {
	size
};

export const border = {
	primary: css`
		border: 1px solid #ccc;
	`,
	light: css`
		border: 1px solid #fff;
	`
};

export const outline = {
	primary: css`
		outline: 2px solid #fff;
	`,
	secondary: css`
		outline: 2px solid #eee;
	`
};
