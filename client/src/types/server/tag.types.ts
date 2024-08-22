import { ID, Timestamp } from "./utility.types";

export type NewTag = {
	user_id: ID;
	name: string;
	description?: string;
};

export type Tag = NewTag & {
	created_at: Timestamp;
};

// TODO: has to be changed here and on the server, category and subcategory no
// longer part of this type
export type TagWithIds = Tag & {
	tag_id: ID;
	category_id?: TagWithIds["tag_id"];
	subcategory_id?: TagWithIds["tag_id"];
};
