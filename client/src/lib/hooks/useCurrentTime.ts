import { useEffect, useState } from "react";
import { createDate } from "@/lib/datetime/make-date";

/**
 * Returns stateful current time that updates every `pollInterval` milliseconds.
 */
export default function useCurrentTime(pollInterval = 5000) {
	const [currentTime, setCurrentTime] = useState(createDate(new Date()));

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(createDate(new Date()));
		}, pollInterval);

		return () => clearInterval(interval);
	}, []);

	return currentTime;
}
