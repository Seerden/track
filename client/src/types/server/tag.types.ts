import { ID, Maybe, Timestamp } from "./utility.types";

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
	parent_id: Maybe<ID>;
	child_ids: Array<ID>;
};
