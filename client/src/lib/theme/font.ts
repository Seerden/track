import type { MainTheme } from "@/lib/theme/theme";

const fontSizes = [
	0.75, 0.8, 0.82, 0.85, 0.86, 0.88, 0.9, 0.93, 1, 1.02, 1.1, 1.2, 1.35, 1.5, 2
] as const;

// TODO: looks hacky, but works
type FontSize = Record<(typeof fontSizes)[number], `${(typeof fontSizes)[number]}rem`>;

const size = fontSizes.reduce((acc, size) => {
	acc[size] = `${size}rem`;
	return acc;
}, {} as FontSize);

export const font = {
	size
};

type Props = object & { theme: MainTheme };
export function getFontSize({ theme }: Props, size: keyof FontSize) {
	return theme.font.size[size];
}
