import DetailedHabit from "@/components/habits/DetailedHabit/DetailedHabit";
import DetailedTag from "@/components/tags/DetailedTag/DetailedTag";
import DetailedActivity from "@/components/Today/DetailedActivity";
import Modal from "@/components/utility/Modal/Modal";
import { useQueryTags } from "@/lib/hooks/query/tags/useQueryTags";
import modalIds from "@/lib/modal-ids";
import { activeItemAtom } from "@/lib/state/active-item-state";
import { syntheticActivitiesAtom } from "@/lib/state/synthetic-activity-state";
import { trpc } from "@/lib/trpc";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

export default function DetailModals() {
	const { data: tags } = useQueryTags();
	const { data: activities } = useQuery(trpc.activities.all.queryOptions());
	const { data: habits } = useQuery(trpc.habits.all.queryOptions());
	const syntheticActivities = useAtomValue(syntheticActivitiesAtom);
	const { tag, habit, activity } = useAtomValue(activeItemAtom);

	// TODO: because not all ids are bigints parsed to strings, and we manually
	// cast them to numbers a lof of the time, the activeItemState contains ids
	// as numbers, whereas the byId Maps usually expect strings. This is why I'm
	// casting the ids to strings. We can get rid of this when we homogeneize the
	// ids to be strings everywhere.
	const activeTag = tag.activeId ? tags?.get(tag.activeId) : null;
	const activeActivity = activity.activeId
		? (activities?.get(activity.activeId) ??
			syntheticActivities.find((a) => a.synthetic_id === activity.activeId))
		: null;
	const activeHabit = habit.activeId ? (habits?.get(habit.activeId) ?? null) : null;

	return (
		<>
			{!!activeActivity && (
				<Modal modalId={modalIds.detailedActivity}>
					<DetailedActivity activity={activeActivity} />
				</Modal>
			)}

			{!!activeHabit && (
				<Modal modalId={modalIds.habits.detailed}>
					<DetailedHabit habit={activeHabit} />
				</Modal>
			)}
			{!!activeTag && (
				<Modal modalId={modalIds.tags.detailed}>
					<DetailedTag tag={activeTag} />
				</Modal>
			)}
		</>
	);
}
