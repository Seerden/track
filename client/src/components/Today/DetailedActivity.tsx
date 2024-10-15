import Modal from "@/components/Modal";
import { activityEnd, activityStart } from "@/lib/activity";
import useActivitiesQuery from "@/lib/query/use-activities-query";
import useTagsQuery from "@/lib/query/use-tags-query";
import type { Datelike } from "@/types/date.types";
import type { ActivityWithIds } from "@/types/server/activity.types";
import dayjs from "dayjs";

type DetailedActivityProps = {
	id: ActivityWithIds["activity_id"];
};

export const activityModalId = "activity-modal";

function format(date: Datelike) {
	return dayjs(date).format("HH:mm (YYYY/MM/DD)");
}

export default function DetailedActivity({ id }: DetailedActivityProps) {
	const { data: activitiesData } = useActivitiesQuery();
	const { data: tagsData } = useTagsQuery();
	if (!activitiesData) return null;

	const activity = activitiesData.activitiesById[id];

	return (
		<Modal modalId={activityModalId}>
			<section
				style={{
					minWidth: "400px"
				}}
			>
				<div
					style={{
						fontSize: "1.5rem",
						fontWeight: "bold",
						marginBottom: "0.5rem",
						width: "70%",
						backgroundColor: "#ddd",
						color: "white",
						padding: "0.5rem",
						borderRadius: "3px 3px 20px 3px"
					}}
				>
					{activity.name}
				</div>

				{!!activity.description.length && <div>{activity.description}</div>}

				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "flex-end",
						alignItems: "flex-end",
						fontSize: "0.8rem",
						color: "#888"
					}}
				>
					<span>{format(activityStart(activity))}</span>
					<span>{format(activityEnd(activity))}</span>
				</div>

				{tagsData?.tagsById && (
					<ul>
						{activity.tag_ids.map((id) => (
							<li
								key={id}
								style={{
									listStyle: "none",
									padding: "0.5rem 0.9rem",
									borderRadius: "4px",
									backgroundColor: "dodgerblue",
									width: "max-content",
									color: "azure"
								}}
							>
								{tagsData.tagsById[id].name}
							</li>
						))}
					</ul>
				)}
			</section>
		</Modal>
	);
}
