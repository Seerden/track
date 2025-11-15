import { arrayMapById } from "@shared/lib/map";
import type { Activity } from "@shared/lib/schemas/activity";
import type { TagWithId } from "@shared/lib/schemas/tag";
import type {
	ActivityTagRelation,
	TagTagRelation,
} from "@shared/types/data/relational.types";
import type { ID } from "@shared/types/data/utility.types";
import { TABLES } from "types/tables";
import { query } from "@/lib/query-function";

/** Get all of a user's tags. */
export const queryTagsByUser = query(
	async (sql, { user_id }: { user_id: ID }) => {
		return sql<TagWithId[]>`
         select * from tags where user_id = ${user_id}
      `;
	}
);

/** Get all child tags for a given parent tag. */
export const queryTagsByParent = query(
	async (sql, { parent_id }: { parent_id: ID }) => {
		const relations = await sql<TagTagRelation[]>`
         select * from tags_tags where parent_id = ${parent_id}
      `;

		if (!relations?.length) return [];

		const childIds = relations.map((r) => r.child_id);
		return sql<TagWithId[]>`
         select * from tags where tag_id = any(${childIds})
      `;
	}
);

/** Get all the tags for a given activity. */
export const queryTagsByActivity = query(
	async (sql, { activity_id }: { activity_id: ID }) => {
		const activityTags = await sql<ActivityTagRelation[]>`
         select * from activities_tags where activity_id = ${activity_id}
      `;

		if (!activityTags?.length) return [];

		const tagIds = activityTags.map((at) => at.tag_id);

		return sql<TagWithId[]>`
         select * from tags where tag_id = any(${tagIds})
      `;
	}
);

export const queryTagRelations = query(
	async (sql, { user_id }: { user_id: ID }) => {
		return sql<[TagTagRelation]>`
         select * from tags_tags where user_id = ${user_id}
      `;
	}
);

/** Given a list of recurrence ids, get all tag_ids (in a map, by the recurrence
 * id of the original activity) of that belong to the activities of
 * recurrence_id.
 * @note this presumes that a recurring activity will never have tags that
 * differ from its original activity. I am not sure if, when going from
 * synthetic -> real, we do not "lock in" the tag_ids for the recurring entry. */
export const queryTagsForRecurringActivities = query(
	async (
		sql,
		{
			user_id,
			recurrence_ids,
		}: {
			user_id: ID;
			recurrence_ids: ID[];
		}
	) => {
		if (!recurrence_ids?.length) return new Map();

		const activityTags = await sql<
			(ActivityTagRelation & Pick<Activity, "recurrence_id">)[]
		>`
         select t.*, a.recurrence_id
         from ${sql(TABLES.activitiesTags)} t
         join ${sql(TABLES.activities)} a 
            on a.activity_id = t.activity_id
         where t.user_id = ${user_id} and
            a.recurrence_id = any(${recurrence_ids}) and
            a.will_recur = true
      `;

		return arrayMapById(activityTags, "recurrence_id", "tag_id");
	}
);

export const queryTagsAndRelations = query(
	async (sql, { user_id }: { user_id: ID }) => {
		const tags = await queryTagsByUser({ user_id });

		if (!tags?.length) return { tags: [], relations: [] };

		const tagIds = tags.map((t) => t.tag_id);

		const relations = await sql<TagTagRelation[]>`
         select * from tags_tags where parent_id = any(${tagIds}) or child_id = any(${tagIds})
      `;

		return { tags, relations };
	}
);
