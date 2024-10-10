import { ActivityWithIds } from "@type/server/activity.types";
import { ID } from "@type/server/utility.types";
import Activity from "./Activity";
import HourMark from "./HourMark";
import * as S from "./Today.style";

type RowProps = {
	index: number;
	activities: ActivityWithIds[];
	indentation: Map<ID, number>;
};

export default function Row({ index, activities, indentation }: RowProps) {
	return (
		<S.Row>
			<HourMark index={index} />

			{activities.map((a) => (
				<Activity key={a.activity_id} activity={a} indentation={indentation} />
			))}
		</S.Row>
	);
}
