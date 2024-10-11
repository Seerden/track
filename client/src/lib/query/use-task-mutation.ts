import { createRequestConfig } from "@/lib/fetch/create-request-config";
import { makeAuthorizedUrl } from "@/lib/fetch/make-authorized-url";
import { queryClient } from "@/lib/query-client";
import { Data } from "@/types/query.types";
import { Activity, ActivityUpdateInput } from "@/types/server/activity.types";
import { useMutation } from "@tanstack/react-query";

async function putTaskCompletion(input: ActivityUpdateInput) {
	const url = makeAuthorizedUrl(`/data/task/completion`);
	return (await fetch(url, createRequestConfig.put({ input }))).json();
}

export default function useTaskCompletionMutation() {
	return useMutation<Data<"input", ActivityUpdateInput>, unknown, Activity>({
		async mutationFn(activity) {
			return putTaskCompletion(activity);
		},
		mutationKey: ["task-completion"],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["activities"] });
		},
	});
}
