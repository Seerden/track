import dayjs from "dayjs";

export function parseTimeString(time: string) {
	// turns e.g. 1230 into dayjs with time to 12:30pm
	// TODO: extend to also parse e.g. 14:30, 2:30pm, 2:30p, 2:30 p, 2:30 p.m., 2:30 p.m, 2:30pm
	return dayjs(time, "HHmm").format("HH:mm");
}
