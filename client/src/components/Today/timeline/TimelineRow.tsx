import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { featherPlus } from "@lucide/lab";
import { TextInput } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import type { PossiblySyntheticActivity } from "@shared/lib/schemas/activity";
import type { ID } from "@shared/types/data/utility.types";
import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import type { Dayjs } from "dayjs";
import { atom, useAtom } from "jotai";
import { Icon } from "lucide-react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useState } from "react";
import { getActivityKey } from "@/components/Today/tasks/get-activity-key";
import CurrentTimeMark from "@/components/Today/timeline/CurrentTimeMark";
import { isToday } from "@/lib/datetime/compare";
import useCurrentTime from "@/lib/hooks/useCurrentTime";
import type { MainTheme } from "@/lib/style/theme";
import { font } from "@/lib/theme/font";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import Activity from "../activities/Activity";
import HourMark from "./HourMark";
import S from "./style/TimelineRow.style";

const MotionIcon = motion(Icon);

const featherIconMotionVariants: Variants = {
	initial: { opacity: 0, visibility: "hidden", x: 5 },
	hover: {
		opacity: 1,
		visibility: "visible",
		x: 0,
	},
	exit: { opacity: 0, visibility: "hidden", x: 10 },
};

const timelineRowMotionVariants = (theme: MainTheme): Variants => ({
	initial: {
		// TODO: have to fall back to the actual original color, otherwise get a
		// warning (value-not-animatable)
		"--hour-mark-color": "unset",
		// TODO: have to fall back to the actual original color, otherwise get a
		// warning (value-not-animatable)
		"--hour-mark-background-color": "unset",
	},
	active: {
		"--hour-mark-color": theme.colors.light[2],
		"--hour-mark-background-color": colord(theme.colors.purple.main).toHex(),
		cursor: "pointer",
		zIndex: 299,
		backgroundColor: colord(theme.colors.purple.main).toHex(),
		borderRadius: 5,
		height: "110%",
		borderBottom: `2px solid ${theme.colors.blue.main}`,
		boxShadow: `0 1rem 0 -0.8rem ${theme.colors.purple.secondary}`,
		transition: {
			duration: 0.05,
			ease: "easeOut",
		},
	},
	hover: {
		backgroundColor: "var(--bg-3-2)",
	},
});

const timelinePopoverMotionVariants = (theme: MainTheme) => ({
	initial: {},
	active: {
		backgroundColor: colord(theme.colors.purple.main).toHex(),
	},
});

const Pop = styled(motion.div)`
   position: absolute;
   width: 300px;
   height: max-content;
   top: 0;
   bottom: 0;
   right: 0;
   margin: auto;
`;

extend([namesPlugin]);

const activeTimelineRowAtom = atom<number | null>(null);

type RowProps = {
	date: Dayjs;
	/** `index` is a number [0,24] that represents the hour of the day. Index 24
	 * refers to midnight of the following day and is only there for display
	 * purposes. */
	index: number;
	activities: PossiblySyntheticActivity[];
	indentation: Map<ID, number>;
};

export default function TimelineRow({
	date,
	index,
	activities,
	indentation,
}: RowProps) {
	const currentTime = useCurrentTime();
	const isCurrentHour = isToday(date) && currentTime.hour() === index;
	const offset = currentTime.minute() / 60;
	const theme = useTheme() as MainTheme;
	const [active, setActive] = useAtom(activeTimelineRowAtom);

	const [variant, setVariant] = useState("initial");

	return (
		<S.Row
			style={{ position: "relative" }}
			// this shouldn't check if activities.length is 0, but if there are no
			// activities that occur at this hour
			$collapsed={activities.length === 0}
		>
			<motion.div
				style={{
					cursor: "pointer",
					display: "flex",
					justifyContent: "flex-end",
					alignItems: "center",
					paddingRight: spacingValue.small,
					position: "absolute",
					width: "100%",
					height: "100%",
					left: 0,
					right: 0,
					top: 0,
					bottom: 0,
					borderBottom: "2px solid transparent",
				}}
				whileHover={active !== index ? "hover" : "active"}
				variants={timelineRowMotionVariants(theme)}
				onMouseDown={() => {
					setActive(index);
					setVariant("active");
				}}
				initial={"initial"}
				whileTap={"active"}
				animate={active === index ? "active" : "initial"}
			>
				<motion.i
					style={{
						display: "flex",
						width: "max-content",
						// marginLeft: "auto",
					}}
					key={`feather-${index}`}
					variants={featherIconMotionVariants}
				>
					<MotionIcon iconNode={featherPlus} size={22} />
				</motion.i>

				<HourMark
					key={index % 24}
					index={index % 24}
					highlighted={isCurrentHour}
				/>
			</motion.div>

			{active === index && (
				<Pop
					key={`timeline-popover-${index}`}
					style={{
						willChange: "auto",
						padding: "0.5rem",
						outline: `2px solid ${theme.colors.background.main[3]}`,
						zIndex: 300,
						backgroundColor: theme.colors.background.main[0],
						fontSize: font.size["0.85"],
						borderRadius: 3,
					}}
					variants={timelinePopoverMotionVariants(theme)}
					// this thing is only visible when active === index, so we can
					// always assume we're "animating" the "active" variant.
					animate={"active"}
					layout
					layoutId="timeline-new-activity"
					transition={{
						duration: 0.035,
						ease: "easeInOut",
					}}
				>
					<TextInput />
					<TimeInput />
				</Pop>
			)}

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
