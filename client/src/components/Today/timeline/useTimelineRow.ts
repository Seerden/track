import { useClickOutside } from "@mantine/hooks";
import { isNullish } from "@shared/lib/is-nullish";
import type { Dayjs } from "dayjs";
import { useAtom } from "jotai";
import { type CSSProperties, useRef } from "react";
import { activeTimelineRowAtom } from "@/components/Today/timeline/active-timeline-row.state";
import { isToday } from "@/lib/datetime/compare";
import useCurrentTime from "@/lib/hooks/useCurrentTime";

// keep these inline for animation purposes
export const innerTimelineRowStyle: CSSProperties = {
	borderBottom: "2px solid transparent",
	justifySelf: "flex-end",
};

export function useTimelineRow({
	date,
	index,
}: {
	date: Dayjs;
	index: number;
}) {
	const currentTime = useCurrentTime();
	const isCurrentHour = isToday(date) && currentTime.hour() === index;
	const offset = currentTime.minute() / 60;
	const [activeTimelineRow, setActiveTimelineRow] = useAtom(
		activeTimelineRowAtom
	);

	const createInlineActivityRef = useRef<HTMLDivElement>(null);
	const clickOutsideRef = useClickOutside((e) => {
		if (
			!isNullish(activeTimelineRow) &&
			createInlineActivityRef.current &&
			!e.composedPath().includes(createInlineActivityRef.current as Node)
		) {
			setActiveTimelineRow(null);
		}
	});

	/** the values have to match the keys of `timelineRowMotionVariants` */
	const variants = {
		animate: activeTimelineRow === index ? "active" : "initial",
		tap: index === 24 ? "initial" : "active",
		hover:
			index === 24
				? "initial"
				: activeTimelineRow === index
					? "active"
					: "hover",
	} as const;

	return {
		clickOutsideRef,
		active: activeTimelineRow,
		setActiveTimelineRow,
		isCurrentHour,
		createInlineActivityRef,
		offset,
		variants,
	};
}
