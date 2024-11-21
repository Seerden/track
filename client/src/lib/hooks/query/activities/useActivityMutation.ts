import { createRequestConfig } from "@/lib/fetch/create-request-config";
import { makeAuthorizedUrl } from "@/lib/fetch/make-authorized-url";
import { mk } from "@/lib/query-keys";
import type { ActivityUpdateInput, ActivityWithIds } from "@t/data/activity.types";
import { useMutation } from "@tanstack/react-query";

async function putActivity(input: ActivityUpdateInput): Promise<ActivityWithIds> {
	const url = makeAuthorizedUrl(`/data/activity/${input.activity.activity_id}`); // TODO: actually create this endpoint
	const updatedActivity = (await fetch(url, createRequestConfig.put({ input }))).json();

	return updatedActivity;
}

export default function useActivityMutation() {
	return useMutation<ActivityWithIds, unknown, ActivityUpdateInput>({
		async mutationFn(input) {
			return putActivity(input);
		},
		mutationKey: mk.activities.update.activity
	});
}
