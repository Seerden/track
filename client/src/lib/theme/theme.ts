import { font } from "@/lib/theme/font";
import { colors } from "./colors";
export const theme = {
	colors,
	font
} as const;
export type MainTheme = typeof theme;
