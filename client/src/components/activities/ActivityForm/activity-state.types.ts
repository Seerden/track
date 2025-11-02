import type {
	ActivityWithIds,
	NewActivityInput,
} from "@shared/lib/schemas/activity";

/** `activity` state in useActivityForm */
export type ActivityState =
	| Partial<NewActivityInput>
	| Partial<ActivityWithIds>;
