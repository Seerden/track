import type { ExecutionContext } from "styled-components";

const baseColors = {
	purple: {
		main: "indigo",
		secondary: "blueviolet",
		tertiary: "darkorchid",
		dark: "darkviolet"
	},
	blue: {
		main: "dodgerblue",
		secondary: "deepskyblue"
	},
	darkBlue: {
		main: "royalblue",
		secondary: "dodgerblue"
	},
	yellow: {
		main: "gold",
		secondary: "orange"
	},
	orange: {
		// TODO: get rid of "orange" as the value for yellow.secondary.
		main: "orange",
		secondary: "darkorange"
	},
	red: {
		main: "tomato",
		secondary: "orangered"
	},
	green: {
		main: "forestgreen",
		secondary: "limegreen"
	}
};

const mainAndSecondary = {
	theme: {
		main: "#e8e8e8",
		secondary: "#ddd"
	},
	themeInverted: {
		main: "#666",
		secondary: "#999"
	}
};

const tintColors = {
	black: "black",
	white: "white",
	light: "#fff",
	secondary: "#eee",
	tertiary: "#e1e1e1",
	shade: {
		primary: "#ccc",
		secondary: "#bbb",
		tertiary: "#aaa"
	}
};

const highlightColors = {
	primary: baseColors.yellow.main,
	secondary: baseColors.red.secondary,
	success: baseColors.green.main,
	info: baseColors.blue.main,
	warning: baseColors.red.secondary,
	danger: baseColors.red.main,
	light: "azure",
	dark: "#333"
};

export const colors = {
	...baseColors,
	...mainAndSecondary,
	highlight: highlightColors,
	tint: tintColors
};

export type ColorKey = keyof typeof baseColors | keyof typeof mainAndSecondary;

export function getMainColor(theme: ExecutionContext["theme"], color: ColorKey) {
	return theme.colors[color].main;
}

export function getSecondaryColor(theme: ExecutionContext["theme"], color: ColorKey) {
	return theme.colors[color].secondary;
}
