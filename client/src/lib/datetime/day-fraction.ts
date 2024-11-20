function currentHour() {
	return dayjs().hour();
}

function currentMinutes() {
	return dayjs().minute();
}

export function currentFractionOfDay() {
	return (currentHour() + currentMinutes() / 60) / 24;
}
