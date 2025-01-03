import api from "@/lib/fetch/api";
import type { ActivitiesData } from "@/types/data.types";
import type {
	ActivityInput,
	ActivityUpdateInput,
	ActivityWithIds,
	TaskUpdateInput
} from "@shared/types/data/activity.types";

async function getActivities() {
	return api.get<ActivitiesData>({ url: "/data/activities" });
}

async function putTaskCompletion(input: TaskUpdateInput) {
	return api.put<TaskUpdateInput, ActivityWithIds>({
		url: `/data/task/completion`,
		body: input
	});
}

async function putActivity(input: ActivityUpdateInput) {
	return api.put<ActivityUpdateInput, ActivityWithIds>({
		url: `/data/activity/${input.activity.activity_id}`,
		body: input
	});
}

async function postNewActivity(input: ActivityInput) {
	return api.post<ActivityInput, ActivityWithIds>({
		url: "/data/activity",
		body: input
	});
}

const activityService = {
	getByUser: getActivities,
	putCompletion: putTaskCompletion,
	put: putActivity,
	post: postNewActivity
};

export default activityService;
