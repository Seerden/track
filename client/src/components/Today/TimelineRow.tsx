import type { ActivityWithIds } from "@type/server/activity.types";
import type { ID } from "@type/server/utility.types";
import Activity from "./Activity";
import HourMark from "./HourMark";
import R from "./style/TimelineRow.style";

type RowProps = {
	index: number;
	activities: ActivityWithIds[];
	indentation: Map<ID, number>;
};

export default function TimelineRow({ index, activities, indentation }: RowProps) {
	return (
		<R.Row>
			<HourMark index={index} />

			{activities.map((a) => (
				<Activity
					key={a.activity_id}
					activity={a}
					level={indentation.get(a.activity_id) ?? 0}
				/>
			))}
		</R.Row>
	);
}
