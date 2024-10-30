import { useDetailedActivityModal } from "@/components/Today/use-detailed-activity-modal";
import type { ActivityWithIds } from "@/types/server/activity.types";
import { Ri24HoursLine } from "react-icons/ri";
import S from "./Today.style";

type AllDayActivityProps = {
	activity: ActivityWithIds;
};
export default function AllDayActivity({ activity }: AllDayActivityProps) {
	const { openDetailedActivityModal } = useDetailedActivityModal({ activity });

	return (
		<S.AllDayActivity
			key={activity.activity_id}
			onClick={(e) => {
				openDetailedActivityModal();
				e.stopPropagation();
			}}
		>
			<p title="This activity lasts all day">
				<Ri24HoursLine size={25} color="white" />
			</p>
			<span>{activity.name}</span>
		</S.AllDayActivity>
	);
}
