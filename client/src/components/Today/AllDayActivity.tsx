import { Checkbox } from "@/components/utility/Checkbox/Checkbox";
import useDetailedItemModal from "@/lib/hooks/useDetailedItemModal";
import usePutTaskCompletion from "@/lib/hooks/usePutTaskCompletion";
import modalIds from "@/lib/modal-ids";
import type { ActivityWithIds } from "@t/data/activity.types";
import { useRef } from "react";
import { Ri24HoursLine } from "react-icons/ri";
import T from "./style/AllDayActivity.style";
import S from "./style/Today.style";

function useAllDayActivity(activity: ActivityWithIds) {
	const { openDetailedItemModal } = useDetailedItemModal(
		"activity",
		modalIds.detailedActivity
	);
	const checkboxRef = useRef<HTMLLabelElement>(null);
	const putCompletion = usePutTaskCompletion(activity);

	return {
		checkboxRef,
		openDetailedItemModal,
		putCompletion
	};
}

type AllDayActivityProps = {
	activity: ActivityWithIds;
};

export default function AllDayActivity({ activity }: AllDayActivityProps) {
	const { checkboxRef, openDetailedItemModal, putCompletion } =
		useAllDayActivity(activity);

	return (
		<T.AllDayActivity
			$completed={activity.completed}
			key={activity.activity_id}
			onClick={(e) => {
				if (checkboxRef.current?.contains(e.target as Node)) return;

				e.stopPropagation();
				openDetailedItemModal(activity.activity_id);
			}}
		>
			<p title="This activity lasts all day">
				<Ri24HoursLine size={25} color="white" />
			</p>

			<span>{activity.name}</span>

			{activity.is_task && (
				<S.CheckboxWrapper ref={checkboxRef}>
					<Checkbox checked={activity.completed} onChange={putCompletion} />
				</S.CheckboxWrapper>
			)}
		</T.AllDayActivity>
	);
}
