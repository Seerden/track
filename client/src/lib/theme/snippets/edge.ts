import { css } from "@emotion/react";
import { colors } from "@/lib/theme/colors";

const edgeSizes = [1, 2, 3, 5] as const;

type EdgeSizeMap = {
	[Size in (typeof edgeSizes)[number]]: `${Size}px`;
};

const size = edgeSizes.reduce((acc, size) => {
	(acc as Record<number, string>)[size] = `${size}px`;
	return acc;
}, {} as EdgeSizeMap);

export const edge = {
	size,
};

// TODO: redo this
export const border = {
	primary: css`
		border: 2px solid #fff;
	`,
	secondary: css`
		border: 2px solid #eee;
	`,
	tertiary: css`
		border: 2px solid #ddd;
	`,
	grey: css`
		border: 2px solid #ccc;
	`,
	tint: css`
		border: 2px solid #777;
	`,
};

// TODO: redo this
export const thinBorder = {
	primary: css`
		border: 1px solid #ccc;
	`,
	secondary: css`
		border: 1px solid #eee;
	`,
	tertiary: css`
		border: 1px solid #ddd;
	`,
	light: css`
		border: 1px solid #fff;
	`,
	darkish: css`
		border: 1px solid #333;
	`,
};

// TODO: redo this
export const thickOutline = {
	grey: css`
		outline: 3px solid #ccc;
	`,
	greyer: css`
		outline: 3px solid #aaa;
	`,
};

// TODO: redo this
export const outline = {
	primary: css`
		outline: 2px solid #fff;
	`,
	secondary: css`
		outline: 2px solid #eee;
	`,
	tertiary: css`
		outline: 2px solid #ddd;
	`,
	grey: css`
		outline: 2px solid #ccc;
	`,
	blue: css`
		outline: 2px solid ${colors.blue.main};
	`,
	blueSecondary: css`
		outline: 2px solid ${colors.blue.secondary};
	`,
};

// TODO: redo this
export const thinOutline = {
	primary: css`
		outline: 1px solid #fff;
	`,
	secondary: css`
		outline: 1px solid #eee;
	`,
	tertiary: css`
		outline: 1px solid #ddd;
	`,
	grey: css`
		outline: 1px solid #ccc;
	`,
};
