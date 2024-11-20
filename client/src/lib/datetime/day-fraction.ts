import day from "@/lib/dayjs";

function currentHour() {
	return day().hour();
}

function currentMinutes() {
	return day().minute();
}

export function currentFractionOfDay() {
	return (currentHour() + currentMinutes() / 60) / 24;
}
