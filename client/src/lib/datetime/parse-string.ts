import day from "@/lib/dayjs";

export function parseTimeString(time: string) {
	// turns e.g. 1230 into dayjs with time to 12:30pm
	// TODO: extend to also parse e.g. 14:30, 2:30pm, 2:30p, 2:30 p, 2:30 p.m.,
	// 2:30 p.m, 2:30pm
	if (+time < 0 || +time > 2359) return null;
	return day(time, "HHmm").format("HH:mm");
}
