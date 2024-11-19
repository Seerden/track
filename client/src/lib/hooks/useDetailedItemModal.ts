import useActivitiesQuery from "@/lib/hooks/query/activities/useActivitiesQuery";
import useHabitsQuery from "@/lib/hooks/query/habits/useHabitsQuery";
import useTagsQuery from "@/lib/hooks/query/tags/useTagsQuery";
import type { ActiveItemState } from "@/lib/state/active-item-state";
import { activeItemState } from "@/lib/state/active-item-state";
import { useModalState } from "@/lib/state/modal-state";
import type { ActivityWithIds } from "@t/data/activity.types";
import type { HabitWithEntries } from "@t/data/habit.types";
import type { TagWithIds } from "@t/data/tag.types";
import type { ID } from "@t/data/utility.types";
import { useCallback } from "react";
import { useRecoilState } from "recoil";

export default function useDetailedItemModal(
	type: keyof ActiveItemState,
	modalId: string
) {
	const [activeItem, setActiveItem] = useRecoilState(activeItemState);
	const { openModal } = useModalState();

	const { data: tagsData } = useTagsQuery();
	const { data: activitiesData } = useActivitiesQuery();
	const { data: habitsData } = useHabitsQuery();

	const getThingById = useCallback(
		(id: ID): (typeof activeItem)[typeof type]["activeItem"] => {
			if (!tagsData || !activitiesData || !habitsData) {
				return null;
			}

			switch (type) {
				case "tag":
					return tagsData?.byId[id] as TagWithIds;
				case "activity":
					return activitiesData?.byId[id] as ActivityWithIds;
				case "habit":
					return habitsData?.byId[id] as HabitWithEntries;
			}
		},
		[tagsData, activitiesData, habitsData]
	);

	function openDetailedItemModal(id: ID) {
		if (!getThingById(id)) {
			console.error(`No ${type} with id ${id} found`);
			return;
		}

		setActiveItem((current) => ({
			...current,
			[type]: {
				shouldShowModal: true,
				activeId: id,
				activeItem: getThingById(id)
			}
		}));

		openModal(modalId);
	}

	return {
		modalId,
		activeItem,
		openDetailedItemModal
	} as const;
}
