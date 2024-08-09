type TimelineEntry = {
	start: number;
	end: number;
	color: string;
	title: string;
};

export const entries: TimelineEntry[] = [
	{
		start: 12 / 24, // noon
		end: 13 / 24, // 1pm
		color: "deepskyblue", // needs to be a css color
		title: "cycling",
	},
	{
		start: 18 / 24,
		end: 19 / 24,
		color: "limegreen",
		title: "dinner",
	},
	{
		start: 20 / 24,
		end: 21.8 / 24,
		color: "blueviolet",
		title: "tennis doubles",
	},
	{
		start: 2 / 24,
		end: 9.5 / 24,
		title: "sleep",
		color: "#666",
	},
];

export const defaultWidth = 720; // pixel width of Timeline, will become scalable eventually
