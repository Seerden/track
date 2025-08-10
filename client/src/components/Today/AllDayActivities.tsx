import AllDayActivity from "@/components/Today/AllDayActivity";
import modalIds from "@/lib/modal-ids";
import Containers from "@/lib/theme/components/container.style";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import type {
	ActivityWithIds,
	PossiblySyntheticActivity
} from "@shared/lib/schemas/activity";
import Modal from "../utility/Modal/Modal";
import S from "./style/Today.style";
import Task from "./Task";

type AllDayActivitiesProps = {
	activities: PossiblySyntheticActivity[];
	// TODO: this could include synthetics, too, I guess, but I feel like that
	// would clog the list, so if we did include them, maybe as a separate thing
	// (like "yoga session: overdue 5 times")
	overdueTasks?: ActivityWithIds[];
};

export default function AllDayActivities({
	activities,
	overdueTasks
}: AllDayActivitiesProps) {
	return (
		<>
			{/* TODO: rename AllDayActivityList to Container or something */}
			<Modal
				modalId={modalIds.activities.tasks.overdue}
				initialOpen={false}
				scrollbarVisible
			>
				<h1
					style={{
						padding: 0,
						paddingBottom: spacingValue.small,
						margin: 0,
						marginTop: spacingValue.medium
					}}
				>
					Overdue tasks
				</h1>
				<Containers.Column
					gap="small"
					padding="medium"
					style={{
						paddingTop: spacingValue.small,
						minWidth: "500px",
						maxHeight: "50vh",
						overflowY: "auto"
					}}
				>
					{!!overdueTasks?.length &&
						overdueTasks.map((t) => <Task activity={t} key={t.activity_id} />)}
				</Containers.Column>
			</Modal>

			<S.AllDayActivityList>
				{activities.map((activity) => (
					<AllDayActivity activity={activity} key={activity.activity_id} />
				))}
			</S.AllDayActivityList>
		</>
	);
}
