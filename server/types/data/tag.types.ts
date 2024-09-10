import { ID, Maybe, Timestamp } from "./utility.types";

export type NewTag = {
	user_id: ID;
	name: string;
	description?: string;
};

export type Tag = NewTag & {
	created_at: Timestamp;
};

export type TagWithId = Tag & {
	tag_id: ID;
};

export type TagWithIds = TagWithId & {
	parent_id: Maybe<ID>;
	child_ids: Maybe<Array<ID>>;
};

export type TagInput = {
	newTag: NewTag;
	parent_id?: ID;
};
