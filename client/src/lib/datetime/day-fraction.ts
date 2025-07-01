import day from "@shared/lib/day";

function currentHour() {
	return day().hour();
}

function currentMinutes() {
	return day().minute();
}

export function currentFractionOfDay() {
	return (currentHour() + currentMinutes() / 60) / 24;
}
