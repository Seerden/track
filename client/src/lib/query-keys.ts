/** query keys */
const qk = {
	user: {
		me: ["me"] as const
	},

	activities: {
		all: ["activities"] as const
	},

	habits: {
		all: ["habits"] as const,
		entries: ["habit-entries"] as const
	},

	notes: {
		all: ["notes"] as const
	},

	tags: {
		all: ["tags"] as const,
		tree: ["tags", "tree"] as const
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
			}
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
