import type { MainTheme } from "@/lib/theme/theme";
declare module "styled-components" {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface DefaultTheme extends MainTheme {}
}
