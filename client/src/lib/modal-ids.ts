export default {
	tagSelector: {
		newActivity: "new-activity-tag-selector",
		newNote: "new-note-tag-selector",
		newTag: "new-tag-tag-selector",
		newHabit: "new-habit-tag-selector"
	},
	habits: {
		new: "new-habit",
		detailed: "detailed-habit"
	},
	notes: {
		home: "home-notes",
		new: "new-note"
	},
	activities: {
		new: "new-activity",
		newTask: "new-task"
	},
	detailedActivity: "detailed-activity", // TODO: do we want this to be dependent on activity_id?
	tagTree: { tree: "tag-tree", tagSelector: "tag-tree-tag-selector" },
	tags: {
		detailed: "detailed-tag"
	}
} as const;
