import { font } from "@/lib/theme/font.ts";
import { colors } from "./colors.ts";
export const theme = {
	colors,
	font
} as const;
export type MainTheme = typeof theme;
