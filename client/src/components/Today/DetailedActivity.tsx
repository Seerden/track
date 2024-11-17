import Modal from "@/components/Modal/Modal";
import S from "@/components/Today/style/DetailedActivity.style";
import { activityEnd, activityStart, hasNotEnded, startsInFuture } from "@/lib/activity";
import { createDate } from "@/lib/datetime/make-date";
import usePutTaskCompletion from "@/lib/hooks/usePutTaskCompletion";
import modalIds from "@/lib/modal-ids";
import useTagsQuery from "@/lib/query/useTagsQuery";
import CardStyle from "@/lib/theme/components/Card.style";
import { Checkbox } from "@/lib/theme/components/Checkbox";
import type { Datelike } from "@/types/date.types";
import type { ActivityWithIds } from "@/types/server/activity.types";

type DetailedActivityProps = {
	activity: ActivityWithIds;
};

// TODO: instead of this, do time (humanizedDate), with a tooltip on
// humanizedDate that shows the full date.
function format(date: Datelike) {
	return createDate(date).format("HH:mm (YYYY/MM/DD)");
}

export default function DetailedActivity({ activity }: DetailedActivityProps) {
	const { data: tagsData } = useTagsQuery();
	const putCompletion = usePutTaskCompletion(activity);
	const humanizedStart = `${startsInFuture(activity) ? "starts" : "started"} ${activityStart(activity).fromNow()}`;
	const showHumanizedStart = hasNotEnded(activity);

	return (
		<Modal modalId={modalIds.detailedActivity}>
			<S.Wrapper>
				<S.Title>
					{activity.is_task && (
						<S.CheckboxWrapper>
							<input type="checkbox" onChange={putCompletion} />
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
						<CardStyle.InfoLine>
							<S.HumanizedStart>{humanizedStart}</S.HumanizedStart>
						</CardStyle.InfoLine>
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

				{tagsData?.byId && (
					<S.Tags>
						{activity.tag_ids.map((id) => (
							<S.Tag key={id}>{tagsData.byId[id].name}</S.Tag>
						))}
					</S.Tags>
				)}
			</S.Wrapper>
		</Modal>
	);
}
