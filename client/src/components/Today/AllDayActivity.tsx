import { useDetailedActivityModal } from "@/components/Today/hooks/use-detailed-activity-modal";
import usePutTaskCompletion from "@/lib/hooks/use-put-task-completion";
import { Checkbox } from "@/lib/theme/components/Checkbox";
import type { ActivityWithIds } from "@/types/server/activity.types";
import { useRef } from "react";
import { Ri24HoursLine } from "react-icons/ri";
import T from "./style/AllDayActivity.style";
import S from "./style/Today.style";

function useAllDayActivity(activity: ActivityWithIds) {
	const { openDetailedActivityModal } = useDetailedActivityModal({ activity });
	const checkboxRef = useRef<HTMLLabelElement>(null);
	const putCompletion = usePutTaskCompletion(activity);

	return {
		checkboxRef,
		openDetailedActivityModal,
		putCompletion
	};
}

type AllDayActivityProps = {
	activity: ActivityWithIds;
};

export default function AllDayActivity({ activity }: AllDayActivityProps) {
	const { checkboxRef, openDetailedActivityModal, putCompletion } =
		useAllDayActivity(activity);

	return (
		<T.AllDayActivity
			key={activity.activity_id}
			onClick={(e) => {
				if (checkboxRef.current?.contains(e.target as Node)) return;

				e.stopPropagation();
				openDetailedActivityModal();
			}}
		>
			<p title="This activity lasts all day">
				<Ri24HoursLine size={25} color="white" />
			</p>

			<span>{activity.name}</span>

			{activity.is_task && (
				<S.CheckboxWrapper ref={checkboxRef}>
					<S.Checkbox
						type="checkbox"
						style={{ display: "none" }}
						checked={activity.completed}
						onChange={putCompletion}
					/>
					<Checkbox checked={activity.completed} />
				</S.CheckboxWrapper>
			)}
		</T.AllDayActivity>
	);
}
