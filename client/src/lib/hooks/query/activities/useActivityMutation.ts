import api from "@/lib/fetch/api";
import { mk } from "@/lib/query-keys";
import type { ActivityUpdateInput, ActivityWithIds } from "@t/data/activity.types";
import { useMutation } from "@tanstack/react-query";

async function putActivity(input: ActivityUpdateInput): Promise<ActivityWithIds> {
	return api.put<ActivityUpdateInput, ActivityWithIds>({
		url: `/data/activity/${input.activity.activity_id}`,
		body: input
	});
}

export default function useActivityMutation() {
	return useMutation<ActivityWithIds, unknown, ActivityUpdateInput>({
		async mutationFn(input) {
			return putActivity(input);
		},
		mutationKey: mk.activities.update.activity
	});
}
