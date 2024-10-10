import { createRequestConfig } from "@/lib/fetch/create-request-config";
import { baseUrl } from "@/lib/fetch/fetch-constants";
import { Data } from "@/types/query.types";
import { Activity, ActivityUpdateInput } from "@/types/server/activity.types";
import { useMutation } from "@tanstack/react-query";

async function putTaskCompletion(input: ActivityUpdateInput) {
	return (
		await fetch(
			`${baseUrl}/task/${input.activity_id}/completion`,
			createRequestConfig.put({ input }),
		)
	).json();
}

export default function useTaskCompletionMutation() {
	return useMutation<Data<"input", ActivityUpdateInput>, unknown, Activity>({
		async mutationFn(activity) {
			return putTaskCompletion(activity);
		},
		mutationKey: ["task-completion"],
	});
}
