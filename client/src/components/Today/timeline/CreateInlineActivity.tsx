import { useTheme } from "@emotion/react";
import { featherPlus } from "@lucide/lab";
import { TextInput } from "@mantine/core";
import { TimePicker, type TimePickerProps } from "@mantine/dates";
import type { NewActivityInput } from "@shared/lib/schemas/activity";
import type { Datelike } from "@shared/lib/schemas/timestamp";
import { produce } from "immer";
import { Icon, LucideMoveRight } from "lucide-react";
import type { RefObject } from "react";
import useActivityForm from "@/components/activities/ActivityForm/useActivityForm";
import { parseTimeInput } from "@/components/Today/timeline/parse-time-input";
import { timelinePopoverMotionVariants } from "@/components/Today/timeline/style/CreateInlineActivity.style";
import { Checkbox } from "@/components/utility/Checkbox/Checkbox";
import { createDate } from "@/lib/datetime/make-date";
import { useBreakpoints } from "@/lib/hooks/breakpoints";
import type { MainTheme } from "@/lib/style/theme";
import Buttons from "@/lib/theme/components/buttons";
import Containers from "@/lib/theme/components/container.style";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import S from "./style/CreateInlineActivity.style";

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
		const field = type === "start" ? "started_at" : "ended_at";
		const { hour, minute } = parseTimeInput(value);
		setActivity(
			produce((draft) => {
				draft[field] = createDate(date).hour(+hour).minute(+minute);
			})
		);
	}

	if (
		active !== timelineRowIndex ||
		!activity.started_at ||
		!activity.ended_at
	) {
		return null;
	}

	return (
		<S.Pop
			ref={ref}
			layout
			layoutId="timeline-new-activity"
			key={`timeline-popover-${timelineRowIndex}`}
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
				<Containers.Flex
					gap="smaller"
					layout
					style={{
						flexDirection: isMobileWidth ? "column" : "row",
						alignItems: "center",
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
				</Containers.Flex>
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
						style={{ padding: 0, marginLeft: spacingValue.smaller }}
					>
						<Icon iconNode={featherPlus} size={18} />
					</Buttons.Action.Minimal>
				</Containers.Row>
			</Containers.Row>
		</S.Pop>
	);
}
