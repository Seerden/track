import type { MainTheme } from "@/lib/style/theme";

/** For when we have theme-dependent values. */
export function lightDark(
	{ theme }: { theme: MainTheme },
	/** light theme value */
	light: string,
	/** dark theme value */
	dark: string
) {
	return theme.mode === "light" ? light : dark;
}
