import { sqlConnection } from "@/db/init";
import type { ActivityWithIds } from "@t/data/activity.types";
import type { ActivityTagRelation } from "@t/data/relational.types";
import type { ID, Maybe } from "@t/data/utility.types";
import type { QueryFunction, WithSQL } from "types/sql.types";

export async function linkTagsToActivity({
	sql = sqlConnection,
	user_id,
	activity_id,
	tag_ids,
}: WithSQL<{ activity_id: ID; user_id: ID; tag_ids: ID[] }>) {
	const tagRelations = tag_ids.map((tag_id) => ({ user_id, activity_id, tag_id }));
	if (!tagRelations.length) return [];
	return sql<ActivityTagRelation[]>`
      insert into activities_tags ${sql(tagRelations)}
      returning *
   `;
}

export const unlinkTagsFromActivity: QueryFunction<
	Pick<ActivityWithIds, "user_id" | "activity_id">,
	Maybe<ActivityTagRelation[]>
> = async ({ sql = sqlConnection, activity_id, user_id }) => {
	return sql<ActivityTagRelation[]>`
      DELETE FROM activities_tags
      WHERE activity_id = ${activity_id}
      AND user_id = ${user_id}
      RETURNING *
   `;
};

// TODO: I want to make db query functions a little more generic. How about this?
// function query<T extends object[]>(query: string, sql = sqlConnection): Promise<T> {
// 	return sql<T>`${query}`;
// }

// const deleteTagsByActivity: QueryFunction<{ activity_id: ID }, ActivityTagRelation[]> = ({
// 	activity_id,
// }) => {
// 	return query<ActivityTagRelation[]>(`
//       DELETE FROM activities_tags
//       WHERE activity_id = ${activity_id}
//       RETURNING *
//    `);
// };
