import useActivity from "@/components/Today/hooks/use-activity.ts";
import { Checkbox } from "@/lib/theme/components/Checkbox.tsx";
import type { ActivityWithIds } from "@type/server/activity.types.ts";
import T from "./style/Activity.style.ts";
import S from "./style/Today.style.ts";

export type ActivityProps = {
	activity: ActivityWithIds;
	level: number;
};

export default function Activity({ activity, level }: ActivityProps) {
	const { offset, openActivityModal, durationHours, putCompletion } = useActivity({
		activity
	});

	return (
		<T.ActivityCard
			key={activity.activity_id}
			$level={level}
			$offset={offset}
			onClick={openActivityModal}
		>
			{/* TODO: on mouseover, display a short humanized time string */}
			<T.Activity $durationHours={durationHours}>
				<T.ActivityName>{activity.name}</T.ActivityName>
				{activity.is_task && (
					// TODO: should really prioritize reworking checkboxes so we can
					// stop using this pattern
					<S.CheckboxWrapper
						style={{ zIndex: 4 }}
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							putCompletion();
						}}
					>
						<S.Checkbox
							type="checkbox"
							checked={activity.completed}
							style={{ display: "none" }}
						/>
						<Checkbox checked={activity.completed} />
					</S.CheckboxWrapper>
				)}
			</T.Activity>
		</T.ActivityCard>
	);
}
