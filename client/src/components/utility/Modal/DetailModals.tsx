import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import DetailedHabit from "@/components/habits/DetailedHabit/DetailedHabit";
import DetailedActivity from "@/components/Today/activities/DetailedActivity";
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
	const { data: habits } = useQuery(trpc.habits.all.queryOptions());

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
	const activeHabit = habit.activeId ? habits?.get(habit.activeId) : null;

	return (
		<>
			<Modal modalId={modalIds.detailedActivity}>
				{!!activeActivity && <DetailedActivity activity={activeActivity} />}
			</Modal>

			<Modal modalId={modalIds.habits.detailed}>
				{!!activeHabit && <DetailedHabit habit={activeHabit} />}
			</Modal>
			<Modal modalId={modalIds.tags.detailed}>
				{!!activeTag && <DetailedTag tag={activeTag} />}
			</Modal>
		</>
	);
}
