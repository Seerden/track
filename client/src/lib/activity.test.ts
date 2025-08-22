import type { ActivityWithIds } from "@shared/lib/schemas/activity";
import {
	activityFallsInTimeWindow,
	activityFallsOnDay,
	getActivityId,
} from "@/lib/activity";
import { createDate } from "@/lib/datetime/make-date";
import type { TimeWindow } from "@/types/time-window.types";
import { createSyntheticActivity } from "./recurrence";

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
		duration_milliseconds: null,
		completed: null,
		will_recur: false,
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

describe("activityFallsInTimeWindow", () => {
	const mockActivity: ActivityWithIds = {
		start_date: new Date("2025-01-01"),
		end_date: new Date("2025-01-02"),
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
		duration_milliseconds: null,
		completed: null,
		will_recur: false,
	};

	it("returns true if activity falls in time window", () => {
		const timeWindow: TimeWindow = {
			startDate: createDate("2025-01-01"),
			endDate: createDate("2025-01-02"),
			intervalUnit: "day",
		};

		expect(activityFallsInTimeWindow(mockActivity, timeWindow)).toBe(true);
	});

	it("returns false if activity does not fall in time window", () => {
		const timeWindow: TimeWindow = {
			startDate: createDate("1900-01-01"),
			endDate: createDate("1900-12-30"),
			intervalUnit: "day",
		};

		expect(activityFallsInTimeWindow(mockActivity, timeWindow)).toBe(false);
	});
});

describe("getActivityId", () => {
	const activity: ActivityWithIds = {
		start_date: "2024-01-01",
		end_date: "2024-01-02",
		started_at: null,
		ended_at: null,
		activity_id: "1",
		created_at: new Date(),
		description: "",
		name: "test",
		user_id: "0",
		is_task: false,
		tag_ids: [],
		occurrence: null,
		recurrence_id: null,
		duration_milliseconds: null,
		completed: null,
		will_recur: false,
	};

	it("returns a real activity's id", () => {
		expect(getActivityId(activity)).toBe("1");
	});

	it("returns a synthetic activity'd id", () => {
		const syntheticActivity = createSyntheticActivity(activity);
		expect(getActivityId(syntheticActivity)).toBe(
			syntheticActivity.synthetic_id
		);
	});
});
