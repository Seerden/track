import type { ID } from "@shared/types/data/utility.types";

/** query keys */
const qk = {
	user: {
		me: ["me"]
	},

	activities: {
		all: ["activities"]
	},

	occurrences: {
		byUser: ["activities", "occurrences"],
		byRecurrence: (recurrence_id: ID) =>
			["activities", "occurrences", "recurrence", recurrence_id] as const
	},
	recurrences: {
		byUser: ["activities", "recurrences"] as const,
		byActivity: (activity_id: ID) =>
			["activities", "recurrences", "activity", activity_id] as const
	},

	habits: {
		all: ["habits"],
		entries: ["habit-entries"]
	},

	notes: {
		all: ["notes"]
	},

	tags: {
		all: ["tags"],
		tree: ["tags", "tree"]
	}
} as const;

/** mutation keys */
const mk = {
	user: {
		login: ["login"],
		logout: ["logout"],
		register: ["register"]
	},

	tags: {
		new: ["new-tag"]
	},

	activities: {
		new: ["new-activity"],
		update: {
			task: {
				completion: ["task-completion"]
			},
			activity: ["activity"]
		}
	},

	notes: {
		new: ["new"]
	},

	habits: {
		new: ["new-habit"],
		delete: ["delete-habit"],
		entries: {
			new: ["new-habit-entry"],
			update: ["habit-entry"]
		}
	}
} as const;

export { mk, qk };
