import dayjs from "dayjs";
import { formatDate } from "../../lib/format-date";
import { ActivityWithIds } from "../../types/server/activity.types";
import type { TagWithIds } from "../../types/server/tag.types";
import * as S from "./ActivityList.style";
import useActivityList from "./use-activity-list";

export default function ActivityList() {
	const { activitiesData: { activitiesById } = {}, tagsData } = useActivityList();

	if (!activitiesById) {
		return <></>;
	}

	return (
		<S.Wrapper>
			<h1>Activities</h1>
			<S.List>
				{Object.values(activitiesById).map((activity) => (
					<ActivityItem
						key={activity.activity_id}
						activity={activity}
						tags={Object.values(tagsData?.tagsById ?? {}).filter((tag) =>
							activity.tag_ids.includes(tag.tag_id)
						)}
					/>
				))}
			</S.List>
		</S.Wrapper>
	);
}

type ActivityItemProps = {
	activity: ActivityWithIds;
	tags?: TagWithIds[];
};

function getStartField(activity: ActivityWithIds) {
	return dayjs(activity.start_date || activity.started_at);
}

function getEndField(activity: ActivityWithIds) {
	return dayjs(activity.end_date || activity.ended_at);
}

function ActivityItem({ activity, tags }: ActivityItemProps) {
	const startsAt = formatDate(getStartField(activity), { short: true }); // this and getEndField should be one function
	const endsAt = formatDate(getEndField(activity), { short: true });

	return (
		<S.Item>
			<S.Title>
				<S.Name>{activity.name}</S.Name>
				<S.Dates>
					<span>
						from <S.Date>{startsAt}</S.Date>
					</span>{" "}
					<span>
						to <S.Date>{endsAt}</S.Date>
					</span>
				</S.Dates>
			</S.Title>
			{activity.description.length > 0 && (
				<S.Description>{activity.description}</S.Description>
			)}

			<Tags tags={tags!} />

			{activity.is_task && <Checkbox />}
		</S.Item>
	);
}

function Checkbox() {
	return <S.Checkbox type="checkbox" />;
}

function Tags({ tags }: { tags: TagWithIds[] }) {
	return (
		<S.Tags>
			{tags.map((tag) => (
				<Tag key={tag.tag_id} tag={tag} />
			))}
		</S.Tags>
	);
}

function Tag({ tag }: { tag: TagWithIds }) {
	return (
		<S.Tag>
			<span>{tag.name}</span>
		</S.Tag>
	);
}
