import { filterTagsById } from "../../lib/filter-tags";
import type { ActivityWithIds } from "../../types/server/activity.types";
import type { TagWithIds } from "../../types/server/tag.types";
import * as S from "./ActivityList.style";
import { getFormattedDateField } from "./get-date-field";
import useActivityList from "./use-activity-list";

export default function ActivityList() {
	const { activitiesData, tagsData } = useActivityList();

	if (!activitiesData?.activitiesById) {
		return <></>;
	}

	const activities = Object.values(activitiesData.activitiesById);
	const tagsById = tagsData?.tagsById;

	return (
		<S.Wrapper>
			<h1>Activities</h1>
			<S.List>
				{activities.map((activity) => {
					const tags = filterTagsById(activity.tag_ids, tagsById);

					return (
						<ActivityItem
							key={activity.activity_id}
							activity={activity}
							tags={tags}
						/>
					);
				})}
			</S.List>
		</S.Wrapper>
	);
}

type ActivityItemProps = {
	activity: ActivityWithIds;
	tags?: TagWithIds[];
};

function ActivityItem({ activity, tags }: ActivityItemProps) {
	const [startsAt, endsAt] = (["start", "end"] as const).map((type) =>
		getFormattedDateField({ type, activity, short: true })
	);

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

			{Array.isArray(tags) && <Tags tags={tags} />}

			{/* TODO: this checkbox will eventually actually be linked to `completed` state. */}
			{activity.is_task && <S.Checkbox type="checkbox" />}
		</S.Item>
	);
}

type TagsProps = {
	tags: TagWithIds[];
};

function Tags({ tags }: TagsProps) {
	return (
		<S.Tags>
			{tags.map((tag) => (
				<Tag key={tag.tag_id} tag={tag} />
			))}
		</S.Tags>
	);
}

type TagProps = {
	tag: TagWithIds;
};

function Tag({ tag }: TagProps) {
	return <S.Tag>{tag.name}</S.Tag>;
}
