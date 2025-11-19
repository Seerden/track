import { useMediaQuery } from "@mantine/hooks";
import { z } from "@shared/lib/zod";
import { atom, useAtom } from "jotai";
import { useLayoutEffect } from "react";
import { darkTheme, lightTheme } from "@/lib/style/theme";

const localStorageKey = "preferred-theme";

const themeValueSchema = z.enum(["light", "dark"]);

const themeAtom = atom<"light" | "dark">(
	themeValueSchema.safeParse(localStorage.getItem(localStorageKey)).data ??
		"dark"
);

export function usePreferredTheme() {
	const [themeValue, setThemeValue] = useAtom(themeAtom);

	function toggleThemeValue() {
		setThemeValue((cur) => {
			const newValue = cur === "light" ? "dark" : "light";
			localStorage.setItem(localStorageKey, newValue);
			return newValue;
		});
	}

	const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");

	useLayoutEffect(() => {
		if (!localStorage.getItem(localStorageKey)) {
			setThemeValue(prefersDark ? "dark" : "light");
			localStorage.setItem(localStorageKey, prefersDark ? "dark" : "light");
		}
	}, [prefersDark]);

	const theme = themeValue === "dark" ? darkTheme : lightTheme;

	return { theme, themeValue, toggleThemeValue, prefersDark };
}
