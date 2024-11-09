import { createRequestConfig } from "@/lib/fetch/create-request-config";
import { makeAuthorizedUrl } from "@/lib/fetch/make-authorized-url";
import type { Data } from "@/types/query.types";
import type { ActivityUpdateInput, ActivityWithIds } from "@/types/server/activity.types";
import { useMutation } from "@tanstack/react-query";

async function putTaskCompletion(input: ActivityUpdateInput): Promise<ActivityWithIds> {
	const url = makeAuthorizedUrl(`/data/task/completion`);
	return (await fetch(url, createRequestConfig.put({ input }))).json();
}

export default function useTaskCompletionMutation() {
	return useMutation<ActivityWithIds, unknown, Data<"input", ActivityUpdateInput>>({
		async mutationFn(activity) {
			return putTaskCompletion(activity.input);
		},
		mutationKey: ["task-completion"],
		onSuccess: () => {
			// queryClient.invalidateQueries({ queryKey: ["activities"] });
			// note: instead of invalidating the entire activities query, we're now
			// manually updating the cache in the onSuccess callback in
			// usePutTaskCompletionMutation. Maybe it should be done here, instead
		}
	});
}
