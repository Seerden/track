import { activityFallsOnDay } from "@/lib/activity";
import { createDate } from "@/lib/datetime/make-date";
import type { ActivityWithIds } from "@shared/lib/schemas/activity";

describe("activityFallsOnDay", () => {
	const mockActivity: ActivityWithIds = {
		start_date: "2024-01-01",
		end_date: "2024-01-02",
		started_at: null,
		ended_at: null,
		activity_id: "0",
		created_at: new Date(),
		description: "",
		name: "test",
		user_id: "0",
		is_task: false,
		tag_ids: [],
		occurrence: null,
		recurrence_id: null,
		duration_milliseconds: null
	};

	it("returns true if activity falls on day", () => {
		const date = createDate("2024-01-01");

		expect(activityFallsOnDay(mockActivity, date)).toBe(true);
	});

	it("returns false if activity does not fall on day", () => {
		const date = createDate("1995-01-03");

		expect(activityFallsOnDay(mockActivity, date)).toBe(false);
	});
});
