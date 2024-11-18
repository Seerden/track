import { activityFallsOnDay } from "@/lib/activity";
import type { ActivityWithIds } from "@t/data/activity.types";

describe("activityFallsOnDay", () => {
	const mockActivity: ActivityWithIds = {
		start_date: "2021-01-01",
		end_date: "2021-01-02",
		started_at: null,
		ended_at: null,
		activity_id: 0,
		created_at: new Date(),
		description: "",
		name: "test",
		user_id: 0,
		is_task: false,
		tag_ids: []
	};

	it("returns true if activity falls on day", () => {
		const date = "2021-01-01";

		expect(activityFallsOnDay(mockActivity, date)).toBe(true);
	});

	it("returns false if activity does not fall on day", () => {
		const date = "2021-01-03";

		expect(activityFallsOnDay(mockActivity, date)).toBe(false);
	});
});
