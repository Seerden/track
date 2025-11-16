import type { MainTheme } from "@/lib/style/theme";

const fontSizes = [
	0.82, 0.85, 0.86, 0.88, 0.9, 0.93, 1, 1.02, 1.1, 1.2, 1.5, 2, 3,
] as const;

// TODO: looks hacky, but works
type FontSize = Record<
	(typeof fontSizes)[number],
	`${(typeof fontSizes)[number]}rem`
>;

const size = fontSizes.reduce((acc, size) => {
	acc[size] = `${size}rem`;
	return acc;
}, {} as FontSize);

export const font = {
	size,
};

type Props = object & { theme: MainTheme };

/**
 * @deprecated just use font.size[value] instead, since font size won't be
 * theme-dependent. */
export function getFontSize({ theme }: Props, size: keyof FontSize) {
	return theme.font.size[size];
}
