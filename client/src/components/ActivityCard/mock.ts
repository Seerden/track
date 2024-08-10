import dayjs, { type Dayjs } from "dayjs";

type Datelike = string | Date | Dayjs | number; // uncedided on this

export type Activity = {
	category: string;
	activity: string;
	date?: Datelike;
	startTime?: Datelike;
	endTime?: Datelike;
	duration?: string; // dayjs probably has a type for this, or we do unix (milli)seconds
	tags: Record<string, string>;
	description: string;
};

export const activity: Activity = {
	category: "Tennis",
	activity: "Stringing",
	date: dayjs(),
	duration: "50 minutes",
	tags: {
		racket: "Wilson RF01",
		tension: "21kg",
		string: "Luxilon ALU Power 1.30",
	},
	description: "RF01 bespannen voor m'n HE8 wedstrijd.",
};
