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
		byTemplate: (item_template_id: ID) =>
			["logbooks", "items", item_template_id] as const,
		rows: {
			all: ["logbooks", "items", "rows"],
			byLog: (log_id: ID) => ["logbooks", "items", "rows", "log", log_id] as const,
			byLogItem: ({ log_id, item_id }: { log_id: ID; item_id: ID }) =>
				["logbooks", "items", "rows", "log", log_id, "item", item_id] as const
		},
		all: ["logbooks", "items"]
	},
	itemTemplates: {
		byLogbook: (logbook_id: ID) =>
			["logbooks", logbook_id, "items", "templates"] as const
	},
	logTemplates: {
		all: ["logbooks", "templates"],
		byId: (log_template_id: ID) => ["logbooks", "templates", log_template_id] as const,
		byLogbook: (logbook_id: ID) =>
			["logbooks", "templates", "logbook", logbook_id] as const
	},
	fields: {
		all: ["logbooks", "fields"],
		byItemRow: (item_row_id: ID) =>
			["logbooks", "items", "rows", item_row_id, "fields"] as const,
		templates: {
			byItemTemplate: (item_template_id: ID) =>
				["logbooks", "items", item_template_id, "fields", "templates"] as const
		}
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
			new: ["new-log"],
			update: ["log"]
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
