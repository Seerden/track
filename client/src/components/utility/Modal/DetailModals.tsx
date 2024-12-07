import DetailedHabit from "@/components/habits/DetailedHabit/DetailedHabit";
import DetailedTag from "@/components/tags/DetailedTag/DetailedTag";
import DetailedActivity from "@/components/Today/DetailedActivity";
import Modal from "@/components/utility/Modal/Modal";
import useActivitiesQuery from "@/lib/hooks/query/activities/useActivitiesQuery";
import useQueryHabits from "@/lib/hooks/query/habits/useQueryHabits";
import useTagsQuery from "@/lib/hooks/query/tags/useTagsQuery";
import modalIds from "@/lib/modal-ids";
import { activeItemState } from "@/lib/state/active-item-state";
import { useRecoilValue } from "recoil";

export default function DetailModals() {
	const { data: tags } = useTagsQuery();
	const { data: activities } = useActivitiesQuery();
	const { data: habits } = useQueryHabits();

	const { tag, habit, activity } = useRecoilValue(activeItemState);

	const activeTag = tag.activeId ? tags?.byId[tag.activeId] : null;
	const activeActivity = activity.activeId ? activities?.byId[activity.activeId] : null;
	const activeHabit = habit.activeId ? habits?.byId[habit.activeId] : null;

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
