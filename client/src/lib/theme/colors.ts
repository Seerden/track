const baseColors = {
	purple: {
		main: "indigo",
		secondary: "blueviolet"
	},
	blue: {
		main: "dodgerblue",
		secondary: "deepskyblue"
	},
	yellow: {
		main: "gold",
		secondary: "orange"
	},
	red: {
		main: "tomato",
		secondary: "orangered"
	},
	green: {
		main: "forestgreen",
		secondary: "limegreen"
	},
	black: "black",
	white: "white"
};

const tintColors = {
	black: "black",
	white: "white"
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

export const colors = { ...baseColors, highlight: highlightColors, tint: tintColors };

export type ColorKey = keyof typeof baseColors;
