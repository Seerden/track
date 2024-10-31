import type { ActivityWithIds } from "@type/server/activity.types";
import type { ID } from "@type/server/utility.types";
import Activity from "./Activity";
import HourMark from "./HourMark";
import R from "./Row.style";

type RowProps = {
	index: number;
	activities: ActivityWithIds[];
	indentation: Map<ID, number>;
};

export default function Row({ index, activities, indentation }: RowProps) {
	return (
		<R.Row>
			<HourMark index={index} />

			{activities.map((a) => (
				<Activity key={a.activity_id} activity={a} indentation={indentation} />
			))}
		</R.Row>
	);
}
