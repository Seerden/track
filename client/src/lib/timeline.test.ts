import type { ActivityWithIds } from "@shared/lib/schemas/activity";
import { createDate, now } from "./datetime/make-date";
import { activityFallsInGap } from "./timeline";

describe("activityFallsInGap", () => {
	test("returns true when there is only one activity that it does not overlap with", () => {
		const startOfDay = now().startOf("day");
		const endOfDay = startOfDay.endOf("day");

		const activity: ActivityWithIds = {
			activity_id: "1",
			started_at: createDate(startOfDay.hour(9).minute(0)),
			ended_at: createDate(startOfDay.hour(10).minute(0)),
			completed: null,
			created_at: now(),
			description: null,
			duration_milliseconds: null,
			end_date: null,
			start_date: null,
			is_task: false,
			name: "Test Activity",
			occurrence: null,
			recurrence_id: null,
			tag_ids: [],
			user_id: "1",
			will_recur: false,
			completion_start: null,
			completion_end: null
		};

		const otherActivity = {
			...activity,
			started_at: createDate(activity.started_at).add(-2, "hour"),
			ended_at: createDate(activity.ended_at).add(-1, "hour")
		};

		expect(activityFallsInGap(activity, [otherActivity], startOfDay, endOfDay)).toBe(
			true
		);
	});

	// TODO: more tests
});
