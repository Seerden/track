import { TagWithIds } from "../../types/server/tag.types";

export const mockTag: TagWithIds = {
	created_at: +new Date(),
	name: "Tennis",
	user_id: 1,
	description: "🎾",
	tag_id: Math.floor(Math.random() * 100),
	child_ids: [],
	parent_id: null,
};
