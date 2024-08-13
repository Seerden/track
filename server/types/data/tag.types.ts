import { ID, Timestamp } from "./utility.types";

export type Tag = {
	user_id: ID;
	tag_id: ID;
	category_id?: ID;
	subcategory_id?: ID;
	name: string;
	description?: string;
	created_at: Timestamp;
};
