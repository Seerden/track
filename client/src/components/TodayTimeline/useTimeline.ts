import { useState } from "react";
import { currentFractionOfDay } from "../../lib/datetime/day-fraction";
import { defaultWidth } from "./mock";

function useTimeline() {
	const [width, setWidth] = useState<number>(defaultWidth); // pixel width of timeline body
	const nowFraction = currentFractionOfDay();

	return { width, setWidth, nowFraction };
}

export default useTimeline;
