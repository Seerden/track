import useActivity from "@/components/Today/use-activity.ts";
import type { ActivityWithIds } from "@type/server/activity.types.ts";
import type { ID } from "@type/server/utility.types.ts";
import * as S from "./Today.style.ts";

export type ActivityProps = {
	activity: ActivityWithIds;
	indentation: Map<ID, number>;
};

export default function Activity({ activity, indentation }: ActivityProps) {
	// TODO: I think indentation level should just be a prop, instead of passing
	// it to the hook and calculating something there.
	const { level, offset, openActivityModal, durationHours } = useActivity({
		activity,
		indentation
	});

	return (
		<S.ActivityCard
			key={activity.activity_id}
			$level={level}
			$offset={offset}
			onClick={openActivityModal}
		>
			<S.Activity $durationHours={durationHours}>
				<S.ActivityName>{activity.name}</S.ActivityName>
			</S.Activity>
		</S.ActivityCard>
	);
}
