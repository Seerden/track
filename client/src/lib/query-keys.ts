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

export default qk;
