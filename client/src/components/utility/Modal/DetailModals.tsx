import DetailedHabit from "@/components/habits/DetailedHabit/DetailedHabit";
import DetailedTag from "@/components/tags/DetailedTag/DetailedTag";
import DetailedActivity from "@/components/Today/DetailedActivity";
import Modal from "@/components/utility/Modal/Modal";
import modalIds from "@/lib/modal-ids";
import { activeItemAtom } from "@/lib/state/active-item-state";
import { trpc } from "@/lib/trpc";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

export default function DetailModals() {
	const { data: tags } = useQuery(trpc.tags.all.queryOptions());
	const { data: activities } = useQuery(trpc.activities.all.queryOptions());
	const { data: habits } = useQuery(trpc.habits.all.queryOptions());

	const { tag, habit, activity } = useAtomValue(activeItemAtom);

	// TODO: because not all ids are bigints parsed to strings, and we manually
	// cast them to numbers a lof of the time, the activeItemState contains ids
	// as numbers, whereas the byId Maps usually expect strings. This is why I'm
	// casting the ids to strings. We can get rid of this when we homogeneize the
	// ids to be strings everywhere.
	const activeTag = tag.activeId ? tags?.byId.get(String(tag.activeId)) : null;
	const activeActivity = activity.activeId
		? activities?.byId.get(String(activity.activeId))
		: null;
	const activeHabit = habit.activeId ? habits?.byId.get(String(habit.activeId)) : null;

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
