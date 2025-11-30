import type { CSSProperties } from "react";
import type { MainTheme } from "@/lib/style/theme";
import { colors } from "@/lib/theme/colors";
import { spacingValue } from "@/lib/theme/snippets/spacing";

export const radioCardStyles = (theme: MainTheme): CSSProperties => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	borderRadius: "50%",
	width: "max-content",
	padding: spacingValue.smaller,
	color: theme.colors.text.main[0],
});

export const radioCardColor = (checked?: boolean) =>
	checked ? colors.dark[0] : "currentColor";

export const radioCardBackgroundColor = (checked?: boolean) =>
	checked ? colors.green.secondary : `var(--bg-1-2)`;
