import type { DeepValue } from "@t/data/utility.types";

/**
 * This is a list of known modal ids. If you're using a modal somewhere, aim to
 * always have it use an id from here. Sometimes an exception may be warranted,
 * in which case you may alias your manually constructed modal id `as ModalId`.
 */
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
	},

	logbooks: {
		itemTemplate: {
			new: "new-item-template"
		},
		item: {
			new: (templateName: string) => `new-item-${templateName}` as ModalId
		},
		logTemplate: {
			form: "log-template-form"
		}
	}
} as const;

export type ModalId = DeepValue<typeof modalIds>;

export default modalIds;
