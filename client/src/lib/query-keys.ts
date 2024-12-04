import type { ID } from "@t/data/utility.types";

/** query keys */
const qk = {
	user: {
		me: ["me"]
	},

	activities: {
		all: ["activities"]
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
	},

	logbooks: {
		all: ["logbooks"],
		byId: (logbook_id: ID) => ["logbooks", logbook_id] as const
	},
	logs: {
		all: ["logbooks", "logs"],
		byLogbook: (logbook_id: ID) => ["logbooks", logbook_id, "logs"] as const
	},
	items: {
		byLogbook: (logbook_id: ID) => ["logbooks", logbook_id, "items"] as const,
		rows: {
			all: ["logbooks", "items", "rows"]
		},
		all: ["logbooks", "items"]
	},
	itemTemplates: {
		byLogbook: (logbook_id: ID) =>
			["logbooks", logbook_id, "items", "templates"] as const
	},
	logTemplates: {
		all: ["logbooks", "templates"],
		byLogbook: (logbook_id: ID) => ["logbooks", logbook_id, "templates"] as const
	},
	fields: {
		all: ["logbooks", "fields"]
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
	},

	logbooks: {
		new: ["new-logbook"],
		update: ["logbook"],
		log: {
			new: ["new-log"]
		},
		template: {
			new: ["new-log-template"]
		},
		itemTemplate: {
			new: ["new-item-template"]
		},
		item: {
			new: ["new-item"]
		}
	}
} as const;

export { mk, qk };
