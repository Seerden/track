import api from "@/lib/fetch/api";
import type { ActivitiesData } from "@/types/data.types";
import type {
	ActivityInput,
	ActivityUpdateInput,
	ActivityWithIds,
	TaskUpdateInput
} from "@t/data/activity.types";

export async function getActivities() {
	return api.get<ActivitiesData>({ url: "/data/activities" });
}

export async function putTaskCompletion(input: TaskUpdateInput) {
	return api.put<TaskUpdateInput, ActivityWithIds>({
		url: `/data/task/completion`,
		body: input
	});
}

export async function putActivity(input: ActivityUpdateInput): Promise<ActivityWithIds> {
	return api.put<ActivityUpdateInput, ActivityWithIds>({
		url: `/data/activity/${input.activity.activity_id}`,
		body: input
	});
}

export async function postNewActivity(input: ActivityInput): Promise<ActivityWithIds> {
	return api.post<ActivityInput, ActivityWithIds>({
		url: "/data/activity",
		body: input
	});
}
