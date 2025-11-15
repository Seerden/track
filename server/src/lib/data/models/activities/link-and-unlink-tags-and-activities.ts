import type { ActivityWithIds } from "@shared/lib/schemas/activity";
import type { ActivityTagRelation } from "@shared/types/data/relational.types";
import type { ID } from "@shared/types/data/utility.types";
import { query } from "@/lib/query-function";

export const linkTagsToActivity = query(
	async (
		sql,
		{
			user_id,
			activity_id,
			tag_ids,
		}: { activity_id: ID; user_id: ID; tag_ids: ID[] }
	) => {
		const tagRelations = tag_ids.map((tag_id) => ({
			user_id,
			activity_id,
			tag_id,
		}));
		if (!tagRelations.length) return [];
		return sql<ActivityTagRelation[]>`
      insert into activities_tags ${sql(tagRelations)}
      returning *
   `;
	}
);

export const unlinkTagsFromActivity = query(
	async (
		sql,
		{ activity_id, user_id }: Pick<ActivityWithIds, "user_id" | "activity_id">
	) => {
		return sql<ActivityTagRelation[]>`
         DELETE FROM activities_tags
         WHERE activity_id = ${activity_id}
         AND user_id = ${user_id}
         RETURNING *
      `;
	}
);
