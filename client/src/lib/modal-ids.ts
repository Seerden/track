import type { DeepValue } from "@t/data/utility.types";

const modalIds = {
	tagSelector: {
		activityForm: "activity-form-tag-selector",
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
		form: "activity-form",
		newTask: "new-task"
	},
	detailedActivity: "detailed-activity", // TODO: should be under activities.detailed like with habits and others
	tagTree: { tree: "tag-tree", tagSelector: "tag-tree-tag-selector" },
	tags: {
		detailed: "detailed-tag"
	}
} as const;

export type ModalId = DeepValue<typeof modalIds>;

export default modalIds;
