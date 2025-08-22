import { activityEnd, activityStart, isOverdueTask } from "@lib/activity";
import { Popover } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { PossiblySyntheticActivity } from "@shared/lib/schemas/activity";
import { LucideClockAlert } from "lucide-react";
import { useTask } from "@/components/Today/useTask";
import { Checkbox } from "@/components/utility/Checkbox/Checkbox";
import { formatToHHmm } from "@/lib/datetime/format-date";
import { now } from "@/lib/datetime/make-date";
import { useQueryTagsByActivity } from "@/lib/hooks/query/tags/useQueryTagsByActivity";
import { colors } from "@/lib/theme/colors";
import Buttons from "@/lib/theme/components/buttons";
import Containers from "@/lib/theme/components/container.style";
import Icons from "@/lib/theme/components/icons";
import List from "@/lib/theme/components/List.style";
import TagCard from "../tags/TagCard/TagCard";
import T from "./style/Tasks.style";
import S from "./style/Today.style";

type TaskProps = {
	activity: PossiblySyntheticActivity;
};

export default function Task({ activity }: TaskProps) {
	const { handleModalOpen, putCompletion } = useTask(activity);
	const tags = useQueryTagsByActivity(activity);
	const [opened, { close, open }] = useDisclosure(false);
	const overdue =
		activityEnd(activity).isBefore(now(), "day") && isOverdueTask(activity);

	return (
		<T.Task $completed={activity.completed ?? false} overdue={overdue}>
			<S.CheckboxWrapper
				onClick={(e) => {
					// This prevents the task from being opened when the checkbox is
					// clicked.
					e.stopPropagation();
				}}>
				<Checkbox
					checked={activity.completed ?? false}
					onChange={putCompletion}
				/>
			</S.CheckboxWrapper>

			{overdue ? (
				<Containers.Column
					style={{
						height: "100%",
						justifyContent: "center",
						alignItems: "center",
					}}>
					<Popover opened={opened}>
						<Popover.Target>
							<Icons.InBadge
								$color={colors.red.secondary}
								size={"23px"}
								onMouseEnter={open}
								onMouseLeave={close}>
								<LucideClockAlert size={16} strokeWidth={2} />
							</Icons.InBadge>
						</Popover.Target>
						<Popover.Dropdown>
							<span style={{ fontSize: "0.90rem" }}>
								<p>This task is overdue.</p>
								<p>It was due {activityEnd(activity).fromNow()}</p>
							</span>
						</Popover.Dropdown>
					</Popover>
				</Containers.Column>
			) : (
				<T.Times>
					<span>from {formatToHHmm(activityStart(activity))}</span>
					<span>to {formatToHHmm(activityEnd(activity))}</span>
				</T.Times>
			)}

			{/* TODO: like with Habit, need a tooltip or something that indicates that 
            clicking the name opens the detailed modal */}
			<Buttons.Unstyled onClick={handleModalOpen}>
				<List.ItemName>{activity.name}</List.ItemName>
			</Buttons.Unstyled>

			{!!tags.length && (
				// TODO: make sure the styling of the component doesn't do anything
				// weird when Tags isn't rendered
				<S.Tags>
					{tags.map((tag) => (
						<TagCard key={tag.tag_id} tag={tag} />
					))}
				</S.Tags>
			)}
		</T.Task>
	);
}
