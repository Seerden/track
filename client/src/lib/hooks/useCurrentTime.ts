import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { createDate } from "@/lib/datetime/make-date";

export const currentTimeAtom = atom(createDate(new Date()));

/**
 * Returns stateful current time that updates every `pollInterval` milliseconds.
 */
export default function useCurrentTime(pollInterval = 5000) {
	const [currentTime, setCurrentTime] = useAtom(currentTimeAtom);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(createDate(new Date()));
		}, pollInterval);

		return () => clearInterval(interval);
	}, []);

	return currentTime;
}
