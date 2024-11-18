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
		login: ["login"] as const,
		logout: ["logout"] as const,
		register: ["register"] as const
	},

	tags: {
		new: ["new-tag"] as const
	},

	activities: {
		new: ["new-activity"] as const,
		update: {
			task: {
				completion: ["task-completion"] as const
			}
		}
	},

	notes: {
		new: ["new"] as const
	},

	habits: {
		new: ["new-habit"] as const,
		delete: ["delete-habit"] as const,
		entries: {
			new: ["new-habit-entry"] as const,
			update: ["habit-entry"] as const
		}
	}
} as const;

export { mk, qk };
