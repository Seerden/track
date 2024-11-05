import { colors } from "./colors.ts";
export const theme = {
	colors
} as const;
export type MainTheme = typeof theme;
