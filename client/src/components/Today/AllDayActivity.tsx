import { useDetailedActivityModal } from "@/components/Today/hooks/use-detailed-activity-modal";
import useTaskCompletionMutation from "@/lib/query/use-task-mutation";
import { Checkbox } from "@/lib/theme/components/Checkbox";
import type { ActivityWithIds } from "@/types/server/activity.types";
import { useRef } from "react";
import { Ri24HoursLine } from "react-icons/ri";
import T from "./AllDayActivity.style";
import S from "./Today.style";

type AllDayActivityProps = {
	activity: ActivityWithIds;
};

export default function AllDayActivity({ activity }: AllDayActivityProps) {
	const { openDetailedActivityModal } = useDetailedActivityModal({ activity });
	const checkboxRef = useRef<HTMLLabelElement>(null);
	const { mutate } = useTaskCompletionMutation();
	function putCompletion() {
		mutate({ ...activity, completed: !activity.completed });
	}

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
