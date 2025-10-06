import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import DetailedHabit from "@/components/habits/DetailedHabit/DetailedHabit";
import DetailedActivity from "@/components/Today/DetailedActivity";
import DetailedTag from "@/components/tags/DetailedTag/DetailedTag";
import Modal from "@/components/utility/Modal/Modal";
import { useQueryTags } from "@/lib/hooks/query/tags/useQueryTags";
import modalIds from "@/lib/modal-ids";
import { activeItemAtom } from "@/lib/state/active-item-state";
import { syntheticActivitiesAtom } from "@/lib/state/synthetic-activity-state";
import { trpc } from "@/lib/trpc";

export default function DetailModals() {
	const { data: tags } = useQueryTags();
	const { data: activities } = useQuery(trpc.activities.all.queryOptions());
	// NOTE: we do not use getHabitsForTimeWindow, because for the habit
	// calendar, we want to create synthetic habits for potentially any date.
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

	return (
		<>
			{!!activeActivity && (
				<Modal modalId={modalIds.detailedActivity}>
					<DetailedActivity activity={activeActivity} />
				</Modal>
			)}

			{!!habit.activeId && (
				<Modal modalId={modalIds.habits.detailed}>
					<DetailedHabit id={habit.activeId} />
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
