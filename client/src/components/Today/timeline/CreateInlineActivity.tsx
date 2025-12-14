import { useTheme } from "@emotion/react";
import { featherPlus } from "@lucide/lab";
import { TextInput } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import type { Activity, NewActivityInput } from "@shared/lib/schemas/activity";
import type { Datelike } from "@shared/lib/schemas/timestamp";
import { extend } from "colord";
import namesPlugin from "colord/plugins/names";
import { produce } from "immer";
import { Icon, LucideMoveRight } from "lucide-react";
import type { ChangeEvent, CSSProperties, RefObject } from "react";
import useActivityForm from "@/components/activities/ActivityForm/useActivityForm";
import { Checkbox } from "@/components/utility/Checkbox/Checkbox";
import { createDate } from "@/lib/datetime/make-date";
import type { MainTheme } from "@/lib/style/theme";
import Buttons from "@/lib/theme/components/buttons";
import Containers from "@/lib/theme/components/container.style";
import { font } from "@/lib/theme/font";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import S, { timelinePopoverMotionVariants } from "./style/TimelineRow.style";

extend([namesPlugin]);

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

	function handleTimeChange(e: ChangeEvent<HTMLInputElement>) {
		const field =
			e.target.name === "start"
				? "started_at"
				: ("ended_at" as const satisfies keyof Activity);

		const [hour, minute] = e.target.value.split(":");

		setActivity(
			produce((draft) => {
				draft[field] = createDate(date).hour(+hour).minute(+minute);
			})
		);
	}

	if (!(active === timelineRowIndex)) {
		return null;
	}

	if (!activity.started_at || !activity.ended_at) {
		return null;
	}

	return (
		<S.Pop
			ref={ref}
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
			<Containers.Row style={{ alignItems: "center" }} gap="smaller">
				<TextInput w="150" name="name" onChange={handleInputChange} />
				<TimeInput
					w="80"
					onChange={handleTimeChange}
					name="start"
					value={createDate(activity.started_at).format("HH:mm")}
				/>
				<LucideMoveRight size={18} color={theme.colors.background.main[4]} />
				<TimeInput
					w="80"
					onChange={handleTimeChange}
					name="end"
					value={createDate(activity.ended_at).format("HH:mm")}
				/>
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
		</S.Pop>
	);
}
