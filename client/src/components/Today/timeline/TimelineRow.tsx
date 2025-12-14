import { useTheme } from "@emotion/react";
import { featherPlus } from "@lucide/lab";
import type { PossiblySyntheticActivity } from "@shared/lib/schemas/activity";
import type { ID } from "@shared/types/data/utility.types";
import type { Dayjs } from "dayjs";
import { AnimatePresence } from "motion/react";
import { getActivityKey } from "@/components/Today/tasks/get-activity-key";
import CreateInlineActivity from "@/components/Today/timeline/CreateInlineActivity";
import CurrentTimeMark from "@/components/Today/timeline/CurrentTimeMark";
import {
	innerTimelineRowStyle,
	useTimelineRow,
} from "@/components/Today/timeline/useTimelineRow";
import type { MainTheme } from "@/lib/style/theme";
import Activity from "../activities/Activity";
import HourMark from "./HourMark";
import S, {
	featherIconMotionVariants,
	MotionIcon,
	timelineRowMotionVariants,
} from "./style/TimelineRow.style";

export default function TimelineRow({
	date,
	index,
	activities,
	indentation,
}: {
	date: Dayjs;
	/** `index` is a number [0,24] that represents the hour of the day. Index 24
	 * refers to midnight of the following day and is only there for display
	 * purposes. */
	index: number;
	activities: PossiblySyntheticActivity[];
	indentation: Map<ID, number>;
}) {
	const {
		clickOutsideRef,
		active,
		setActive,
		setVariant,
		isCurrentHour,
		createInlineActivityRef,
		offset,
		variants,
	} = useTimelineRow({ date, index });
	const theme = useTheme() as MainTheme;

	return (
		<S.Row
			ref={clickOutsideRef}
			layout
			// this shouldn't check if activities.length is 0, but if there are no
			// activities that occur at this hour
			$collapsed={activities.length === 0}
		>
			<S.InnerRow
				variants={timelineRowMotionVariants(theme)}
				initial={"initial"}
				animate={variants.animate}
				whileTap={variants.tap}
				whileHover={variants.hover}
				onMouseDown={() => {
					if (index !== 24) {
						setActive(index);
						setVariant("active");
					}
				}}
				style={innerTimelineRowStyle}
			>
				<S.FeatherIconWrapper
					key={`feather-${index}`}
					variants={featherIconMotionVariants}
				>
					<MotionIcon iconNode={featherPlus} size={22} />
				</S.FeatherIconWrapper>

				<HourMark index={index % 24} highlighted={isCurrentHour} />
			</S.InnerRow>

			<CreateInlineActivity
				active={active}
				ref={createInlineActivityRef}
				key={`timeline-popover-${index}`}
				timelineRowIndex={index}
				date={date}
			/>

			{isCurrentHour && <CurrentTimeMark offset={offset} />}

			<AnimatePresence mode="popLayout">
				{activities.map((a) => (
					<Activity
						key={getActivityKey(a)}
						date={date}
						activity={a}
						level={indentation.get(a.activity_id ?? a.synthetic_id) ?? 0}
					/>
				))}
			</AnimatePresence>
		</S.Row>
	);
}
