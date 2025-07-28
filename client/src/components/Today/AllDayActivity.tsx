import { Checkbox } from "@/components/utility/Checkbox/Checkbox";
import useDetailedItemModal from "@/lib/hooks/useDetailedItemModal";
import usePutTaskCompletion from "@/lib/hooks/usePutTaskCompletion";
import modalIds from "@/lib/modal-ids";
import type { PossiblySyntheticActivity } from "@shared/lib/schemas/activity";
import { LucideHistory } from "lucide-react";
import { useRef } from "react";
import T from "./style/AllDayActivity.style";
import S from "./style/Today.style";

function useAllDayActivity(activity: PossiblySyntheticActivity) {
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
	activity: PossiblySyntheticActivity;
};

export default function AllDayActivity({ activity }: AllDayActivityProps) {
	const { checkboxRef, openDetailedItemModal, putCompletion } =
		useAllDayActivity(activity);

	return (
		<T.AllDayActivity
			$completed={activity.completed ?? false}
			key={activity.activity_id}
			onClick={(e) => {
				if (checkboxRef.current?.contains(e.target as Node)) return;

				e.stopPropagation();
				openDetailedItemModal(activity.activity_id ?? activity.synthetic_id);
			}}
		>
			<p title="This activity lasts all day">
				<LucideHistory size={15} />
			</p>

			<span>{activity.name}</span>

			{activity.is_task && (
				<S.CheckboxWrapper ref={checkboxRef}>
					<Checkbox checked={activity.completed ?? false} onChange={putCompletion} />
				</S.CheckboxWrapper>
			)}
		</T.AllDayActivity>
	);
}
