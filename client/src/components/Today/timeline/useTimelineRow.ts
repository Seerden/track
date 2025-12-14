import { useClickOutside } from "@mantine/hooks";
import type { Dayjs } from "dayjs";
import { useAtom } from "jotai";
import { type CSSProperties, useRef, useState } from "react";
import { activeTimelineRowAtom } from "@/components/Today/timeline/TimelineRow";
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
	const [active, setActive] = useAtom(activeTimelineRowAtom);
	const [variant, setVariant] = useState("initial");

	const createInlineActivityRef = useRef<HTMLDivElement>(null);
	const clickOutsideRef = useClickOutside((e) => {
		if (
			active &&
			createInlineActivityRef.current &&
			!e.composedPath().includes(createInlineActivityRef.current as Node)
		) {
			setActive(null);
			setVariant("initial");
		}
	});

	const variants = {
		animate: active === index ? "active" : "initial",
		tap: index === 24 ? "initial" : "active",
		hover: active === index ? "active" : "hover",
	};

	return {
		clickOutsideRef,
		active,
		setActive,
		setVariant,
		isCurrentHour,
		createInlineActivityRef,
		offset,
		variants,
	};
}
