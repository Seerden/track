import { ID, Timestamp } from "./utility.types";

export type NewTag = {
	user_id: ID;
	name: string;
	description?: string;
};

export type Tag = NewTag & {
	created_at: Timestamp;
};

export type TagWithIds = Tag & {
	tag_id: ID;
	category_id?: TagWithIds["tag_id"];
	subcategory_id?: TagWithIds["tag_id"];
};
