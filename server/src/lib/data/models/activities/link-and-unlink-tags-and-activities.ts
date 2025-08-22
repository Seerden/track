import type { ActivityWithIds } from "@shared/lib/schemas/activity";
import type { ActivityTagRelation } from "@shared/types/data/relational.types";
import type { ID, Maybe } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";
import { sqlConnection } from "@/db/init";

export const linkTagsToActivity: QueryFunction<
	{ activity_id: ID; user_id: ID; tag_ids: ID[] },
	Promise<ActivityTagRelation[]>
> = async ({ sql = sqlConnection, user_id, activity_id, tag_ids }) => {
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
};

export const unlinkTagsFromActivity: QueryFunction<
	Pick<ActivityWithIds, "user_id" | "activity_id">,
	Promise<Maybe<ActivityTagRelation[]>>
> = async ({ sql = sqlConnection, activity_id, user_id }) => {
	return sql<ActivityTagRelation[]>`
      DELETE FROM activities_tags
      WHERE activity_id = ${activity_id}
      AND user_id = ${user_id}
      RETURNING *
   `;
};
