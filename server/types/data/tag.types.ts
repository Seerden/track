import { ID, Timestamp } from "./utility.types";

export type Tag = {
	user_id: ID;
	tag_id: ID;
	category_id?: Tag["tag_id"];
	subcategory_id?: Tag["tag_id"];
	name: string;
	description?: string;
	created_at: Timestamp;
};
