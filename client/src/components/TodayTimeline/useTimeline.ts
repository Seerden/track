import { useState } from "react";
import { defaultWidth } from "./mock";
import { currentFractionOfDay } from "./now";

function useTimeline() {
	const [width, setWidth] = useState<number>(defaultWidth); // pixel width of timeline body
	const nowFraction = currentFractionOfDay();

	return { width, setWidth, nowFraction };
}

export default useTimeline;
