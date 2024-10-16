import Modal from "@/components/Modal";
import S from "@/components/Today/DetailedActivity.style";
import { activityEnd, activityStart, hasNotEnded, startsInFuture } from "@/lib/activity";
import { createDate } from "@/lib/datetime/make-date";
import modalIds from "@/lib/modal-ids";
import useActivitiesQuery from "@/lib/query/use-activities-query";
import useTagsQuery from "@/lib/query/use-tags-query";
import useTaskCompletionMutation from "@/lib/query/use-task-mutation";
import { Checkbox } from "@/lib/theme/components/Checkbox";
import type { Datelike } from "@/types/date.types";
import type { ActivityWithIds } from "@/types/server/activity.types";

type DetailedActivityProps = {
	id: ActivityWithIds["activity_id"];
};

// TODO: instead of this, do time (humanizedDate), with a tooltip on
// humanizedDate that shows the full date.
function format(date: Datelike) {
	return createDate(date).format("HH:mm (YYYY/MM/DD)");
}

export default function DetailedActivity({ id }: DetailedActivityProps) {
	const { data: activitiesData } = useActivitiesQuery();
	const { data: tagsData } = useTagsQuery();
	const { mutate } = useTaskCompletionMutation();

	// TODO: this should _definitely_ be in a useTaskCompletionMutation hook.
	// It's being done in Task.tsx as well, and just shouldn't be done at the
	// component-level like this.
	function putCompletion(activity: ActivityWithIds) {
		mutate({ ...activity, completed: !activity.completed });
	}
	if (!activitiesData) return null;

	const activity = activitiesData.activitiesById[id];

	const humanizedStart = `${startsInFuture(activity) ? "starts" : "started"} ${activityStart(activity).fromNow()}`;
	const showHumanizedStart = hasNotEnded(activity);

	return (
		<Modal modalId={modalIds.detailedActivity}>
			<S.Wrapper>
				<S.Title>
					{activity.is_task && (
						<S.CheckboxWrapper>
							<input type="checkbox" onChange={() => putCompletion(activity)} />
							<Checkbox checked={activity.completed} />
						</S.CheckboxWrapper>
					)}
					<span>{activity.name}</span>
				</S.Title>

				{!!activity.description.length && (
					<S.Description>{activity.description}</S.Description>
				)}

				<S.Time>
					{showHumanizedStart && (
						<S.HumanizedStart>{humanizedStart}</S.HumanizedStart>
					)}
					<S.Datetime>
						<span>
							from <span>{format(activityStart(activity))}</span>
						</span>
						<span>
							to <span>{format(activityEnd(activity))}</span>
						</span>
					</S.Datetime>
				</S.Time>

				{!!activity.is_task && (
					<S.Task>
						{activity.completed && (
							<S.Datetime>
								{activity.completion_start && (
									<>from {format(activity.completion_start)}</>
								)}
								{activity.completion_end && (
									<>to {format(activity.completion_end)}</>
								)}
							</S.Datetime>
						)}
					</S.Task>
				)}

				{tagsData?.tagsById && (
					<S.Tags>
						{activity.tag_ids.map((id) => (
							<S.Tag key={id}>{tagsData.tagsById[id].name}</S.Tag>
						))}
					</S.Tags>
				)}
			</S.Wrapper>
		</Modal>
	);
}
