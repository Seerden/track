import day from "@shared/lib/day";

export let daysOfWeekShort: string[] = day.weekdaysShort();
// TODO: this is a hack to get Sunday to be the last day of the week, should
// look into custom locales for dayjs, instead
daysOfWeekShort = daysOfWeekShort.slice(1).concat(daysOfWeekShort[0]);
