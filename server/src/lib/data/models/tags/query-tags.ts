import { sqlConnection } from "@/db/init";
import type {
	ActivityTagRelation,
	TagTagRelation,
} from "@shared/types/data/relational.types";
import type { TagWithId } from "@shared/types/data/tag.types";
import type { ID } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";

/** Get all of a user's tags. */
export const queryTagsByUser: QueryFunction<
	{ user_id: ID },
	Promise<TagWithId[]>
> = async ({ sql = sqlConnection, user_id }) => {
	return sql<TagWithId[]>`
      select * from tags where user_id = ${user_id}
   `;
};

/** Get all child tags for a given parent tag. */
export const queryTagsByParent: QueryFunction<
	{ parent_id: ID },
	Promise<TagWithId[]>
> = async ({ sql = sqlConnection, parent_id }) => {
	const relations = await sql<
		TagTagRelation[]
	>`select * from tags_tags where parent_id = ${parent_id}`;

	if (!relations?.length) return [];

	const childIds = relations.map((r) => r.child_id);
	return sql<TagWithId[]>`select * from tags where tag_id = any(${childIds})`;
};

/** Get all the tags for a given activity. */
export const queryTagsByActivity: QueryFunction<
	{ activity_id: ID },
	Promise<TagWithId[]>
> = async ({ sql = sqlConnection, activity_id }) => {
	const activityTags = await sql<ActivityTagRelation[]>`
      select * from activities_tags where activity_id = ${activity_id}
   `;

	if (!activityTags?.length) return [];

	const tagIds = activityTags.map((at) => at.tag_id);

	return sql<TagWithId[]>`
      select * from tags where tag_id = any(${tagIds})
   `;
};

export const queryTagRelations: QueryFunction<
	{ user_id: ID },
	Promise<TagTagRelation[]>
> = async ({ sql = sqlConnection, user_id }) => {
	return sql<[TagTagRelation]>`
      select * from tags_tags where user_id = ${user_id}
   `;
};

export const queryTagsAndRelations: QueryFunction<
	{ user_id: ID },
	Promise<{ tags: TagWithId[]; relations: TagTagRelation[] }>
> = async ({ sql = sqlConnection, user_id }) => {
	const tags = await queryTagsByUser({ sql, user_id });

	if (!tags?.length) return { tags: [], relations: [] };

	const tagIds = tags.map((t) => t.tag_id);

	const relations = await sql<TagTagRelation[]>`
      select * from tags_tags where parent_id = any(${tagIds}) or child_id = any(${tagIds})
   `;

	return { tags, relations };
};
