import type { TagWithIds } from "../../types/server/tag.types";
import type { ID } from "../../types/server/utility.types";

export const mockTags: Record<ID, TagWithIds> = {
	0: {
		child_ids: [1, 2],
		created_at: 1,
		name: "Sports",
		parent_id: null,
		tag_id: 0,
		user_id: 1,
	},
	1: {
		child_ids: [3],
		created_at: 1,
		name: "Tennis",
		parent_id: 0,
		tag_id: 1,
		user_id: 1,
	},
	2: {
		name: "Cycling",
		parent_id: 0,
		tag_id: 2,
		user_id: 1,
		created_at: 1,
		child_ids: [],
	},
	4: {
		name: "Four",
		parent_id: 0,
		tag_id: 4,
		user_id: 1,
		created_at: 1,
		child_ids: [],
	},
	5: {
		name: "Five",
		parent_id: 0,
		tag_id: 5,
		user_id: 1,
		created_at: 1,
		child_ids: [],
	},
	6: {
		name: "Six",
		parent_id: 0,
		tag_id: 6,
		user_id: 1,
		created_at: 1,
		child_ids: [],
	},
	7: {
		name: "Seven",
		parent_id: 0,
		tag_id: 7,
		user_id: 1,
		created_at: 1,
		child_ids: [],
	},
};
