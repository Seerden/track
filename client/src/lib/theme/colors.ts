import type { DeepValue } from "@shared/types/data/utility.types";

const baseColors = {
	purple: {
		main: "indigo",
		secondary: "blueviolet",
		tertiary: "darkorchid",
		dark: "darkviolet",
	},
	blue: {
		main: "dodgerblue",
		secondary: "deepskyblue",
	},
	darkBlue: {
		main: "royalblue",
		secondary: "dodgerblue",
	},
	yellow: {
		main: "hsl(54, 100.00%, 50.00%)",
		secondary: "gold",
	},
	orange: {
		main: "orange",
		secondary: "darkorange",
	},
	red: {
		main: "tomato",
		secondary: "orangered",
	},
	green: {
		main: "forestgreen",
		secondary: "limegreen",
	},
	darkGreen: {
		main: "#143516",
	},
} as const;

const baseColorsDark = {
	...baseColors,
	purple: {
		...baseColors.purple,
		main: baseColors.purple.tertiary,
	},
};

const light = {
	0: "#fff",
	1: "#f7f7f7",
	2: "#f2f2f2",
	3: "#eee",
	4: "#ddd",
	5: "#ccc",
	6: "#aaa",
} as const;

const dark = {
	0: "#000",
	1: "#111",
	2: "#222",
	3: "#333",
	4: "#555",
	5: "#777",
	6: "#888",
} as const;

export const textLight = {
	main: {
		0: dark[0],
		1: dark[1],
		2: dark[2],
		3: dark[3],
		4: dark[4],
		5: dark[5],
	},
	contrast: {
		0: light[0],
		1: light[1],
		2: light[2],
		3: light[3],
		4: light[4],
		5: light[5],
	},
} as const;

export const textDark = {
	main: textLight.contrast,
	contrast: textLight.main,
} as const;

const backgroundLight = {
	main: {
		0: light[0],
		1: light[1],
		2: light[2],
		3: light[3],
		4: light[4],
		5: light[5],
		6: light[6],
	},
	contrast: {
		0: dark[0],
		1: dark[1],
		2: dark[2],
		3: dark[3],
		4: dark[4],
		5: dark[5],
		6: dark[6],
	},
} as const;

const backgroundDark = {
	main: backgroundLight.contrast,
	contrast: backgroundLight.main,
} as const;

export const colors = {
	...baseColors,
	light,
	dark,
	text: textLight,
	background: backgroundLight,
};

export const darkColors = {
	...baseColorsDark,
	light,
	dark,
	text: textDark,
	background: backgroundDark,
};

export type ColorKey = DeepValue<
	typeof baseColors | typeof light | typeof dark
>;
