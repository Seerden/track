import { useTheme } from "@emotion/react";
import { featherPlus } from "@lucide/lab";
import { TextInput } from "@mantine/core";
import { TimePicker, type TimePickerProps } from "@mantine/dates";
import type { Activity, NewActivityInput } from "@shared/lib/schemas/activity";
import type { Datelike } from "@shared/lib/schemas/timestamp";
import { produce } from "immer";
import { Icon, LucideMoveRight } from "lucide-react";
import { motion } from "motion/react";
import type { CSSProperties, RefObject } from "react";
import useActivityForm from "@/components/activities/ActivityForm/useActivityForm";
import { timelinePopoverMotionVariants } from "@/components/Today/timeline/style/CreateInlineActivity.style";
import { Checkbox } from "@/components/utility/Checkbox/Checkbox";
import { createDate } from "@/lib/datetime/make-date";
import { useBreakpoints } from "@/lib/hooks/breakpoints";
import type { MainTheme } from "@/lib/style/theme";
import Buttons from "@/lib/theme/components/buttons";
import Containers from "@/lib/theme/components/container.style";
import { font } from "@/lib/theme/font";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import S from "./style/CreateInlineActivity.style";

// TODO: min, max, presets (also for the other time picker)
const timePickerProps = (isMobileWidth: boolean): TimePickerProps => ({
	withDropdown: true,
	minutesStep: 5,
	popoverProps: {
		withinPortal: false,
		position: "bottom",
	},
	w: "9ch",
	flex: isMobileWidth ? 1 : 0,
	style: {
		touchAction: "none",
		userSelect: "none",
	},
});

// TODO: go over styling. What goes in styled components, and what needs to
// remain inline?
export default function CreateInlineActivity({
	date,
	timelineRowIndex,
	ref,
	active,
}: {
	date: Datelike;
	timelineRowIndex: number;
	ref: RefObject<HTMLDivElement | null>;
	active: null | number;
}) {
	const theme = useTheme() as MainTheme;
	const {
		activity,
		isValidActivity,
		setActivity,
		handleInputChange,
		handleSubmit,
	} = useActivityForm({
		inline: true,
		date,
		timelineRowIndex,
	});
	const { isMobileWidth } = useBreakpoints();

	/** the regular ActivityForm uses datetime pickers, hence we need a new
	 * handler for the time-only inputs in this component. */
	function handleTimeChange(value: string, type: "start" | "end") {
		const field =
			type === "start"
				? "started_at"
				: ("ended_at" as const satisfies keyof Activity);

		const [hour, minute] = value.split(":");

		setActivity(
			produce((draft) => {
				draft[field] = createDate(date).hour(+hour).minute(+minute);
			})
		);
	}

	return (
		active === timelineRowIndex &&
		!!activity.started_at &&
		!!activity.ended_at && (
			<S.Pop
				ref={ref}
				layout
				layoutId="timeline-new-activity"
				key={`timeline-popover-${timelineRowIndex}`}
				style={
					{
						willChange: "auto",
						outline: `2px solid ${theme.colors.background.main[3]}`,
						zIndex: 300,
						backgroundColor: theme.colors.background.main[0],
						fontSize: font.size["0.85"],
						borderRadius: 3,
						display: "flex",
						flexDirection: "row",
					} as CSSProperties
				}
				variants={timelinePopoverMotionVariants(theme)}
				initial="initial"
				// this thing is only visible when active === index, so we can
				// always assume we're "animating" the "active" variant.
				animate="active"
				transition={{
					duration: 0.035,
					ease: "easeInOut",
				}}
			>
				<Containers.Row style={{ alignItems: "stretch" }} gap="smaller">
					<motion.div
						layout
						style={{
							display: "flex",
							flexDirection: isMobileWidth ? "column" : "row",
							alignItems: "center",
							gap: spacingValue.smaller,
						}}
					>
						<TextInput
							w={isMobileWidth ? "100%" : "150px"}
							name="name"
							placeholder="Activity name"
							onChange={handleInputChange}
						/>
						<Containers.Row
							gap="smaller"
							style={{
								alignItems: "center",
								width: isMobileWidth ? "100%" : "max-content",
							}}
							layout="position"
						>
							<TimePicker
								{...timePickerProps(isMobileWidth)}
								w="9ch"
								flex={isMobileWidth ? 1 : 0}
								onChange={(value) => handleTimeChange(value, "start")}
								name="start"
								value={createDate(activity.started_at).format("HH:mm")}
							/>
							<LucideMoveRight
								size={18}
								color={theme.colors.background.main[4]}
							/>
							<TimePicker
								{...timePickerProps(isMobileWidth)}
								onChange={(value) => handleTimeChange(value, "end")}
								name="end"
								value={createDate(activity.ended_at).format("HH:mm")}
							/>
						</Containers.Row>
					</motion.div>
					<Containers.Row
						gap="small"
						style={{
							alignItems: "flex-start",
							marginLeft: spacingValue.small,
							alignSelf: isMobileWidth ? "flex-start" : "center",
						}}
					>
						<label>
							<Checkbox
								size={18}
								name={"is_task" satisfies keyof NewActivityInput}
								checked={activity.is_task}
								onChange={handleInputChange}
							/>
						</label>

						<Buttons.Action.Minimal
							onClick={handleSubmit}
							type="button"
							disabled={!isValidActivity}
							style={{
								padding: 0,
								marginLeft: spacingValue.smaller,
							}}
						>
							<Icon iconNode={featherPlus} size={18} />
						</Buttons.Action.Minimal>
					</Containers.Row>
				</Containers.Row>
			</S.Pop>
		)
	);
}
