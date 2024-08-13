import { Tag } from "./tag.types";
import { ID, Timestamp } from "./utility.types";

export type Activity = {
	user_id: ID;
	activity_id: ID;
	name: string;
	description: string;
	tags: Tag[];
	category_id?: ID; // a category is a tag with no parent
	subcategory_id?: ID; // same as a category ID, but the user decides it's a subcategory
	started_at?: Timestamp;
	ended_at?: Timestamp;
	from_date?: string; // YYYYMMDD
	to_date?: string;
	duration?: number; // in milliseconds
	created_at: Timestamp;
};
