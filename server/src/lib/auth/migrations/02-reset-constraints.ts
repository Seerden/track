import type { User as OldUser } from "@shared/lib/schemas/user";
import type { User } from "better-auth";
import { config } from "dotenv";
import { TABLES } from "types/tables";
import { createTransaction, query } from "@/lib/query-function";

config();

/*
-- could leave out the AND ccu.column_name = 'user_id' and add ccu.column_name
   to this, we'd see that all columns are user_id 
SELECT tc.table_schema, tc.table_name, tc.constraint_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.constraint_column_usage AS ccu
  ON tc.constraint_name = ccu.constraint_name
  AND tc.table_schema = ccu.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND ccu.table_name = 'users';
  AND ccu.column_name = 'user_id';
*/

/*
 table_schema |     table_name     |         constraint_name
--------------+--------------------+---------------------------------
 public       | recurrences        | recurrences_user_id_fkey
 public       | occurrences        | occurrences_user_id_fkey
 public       | habits             | fk_habits_users
 public       | tags               | fk_tags_users
 public       | activities         | fk_activities_users
 public       | tags_tags          | fk_tags_tags_users
 public       | habits_tags        | fk_habits_tags_users
 public       | push_subscriptions | push_subscriptions_user_id_fkey
 public       | user_settings      | user_settings_user_id_fkey
*/
const constraints = [
	// build a json object {table_name, constraint_name}

	{ table_name: "recurrences", constraint_name: "recurrences_user_id_fkey" },
	{ table_name: "occurrences", constraint_name: "occurrences_user_id_fkey" },
	{ table_name: "habits", constraint_name: "fk_habits_users" },
	{ table_name: "tags", constraint_name: "fk_tags_users" },
	{ table_name: "activities", constraint_name: "fk_activities_users" },
	{ table_name: "tags_tags", constraint_name: "fk_tags_tags_users" },
	{ table_name: "habits_tags", constraint_name: "fk_habits_tags_users" },
	{
		table_name: "push_subscriptions",
		constraint_name: "push_subscriptions_user_id_fkey",
	},
	{
		table_name: "user_settings",
		constraint_name: "user_settings_user_id_fkey",
	},
];

export const migrateUserIdConstraints = query(async () => {
	return await createTransaction(async (sql) => {
		console.log("Migrating user ids to better auth.");
		const users = await sql<OldUser[]>`select * from ${sql(TABLES.users)}`;
		const betterAuthUsers = await sql<
			User[]
		>`select * from ${sql(TABLES.BETTER_AUTH.USERS)}`;

		const userMap = users
			.map((user) => [
				user.user_id,
				betterAuthUsers.find((bu) => bu.email === user.email)?.id,
			])
			.filter((entry) => !!entry[0] && !!entry[1]) as [string, string][];

		// drop constraints
		for (const entry of constraints) {
			await sql`
            alter table ${sql(entry.table_name)}
            drop constraint if exists ${sql(entry.constraint_name)}
         `;
		}

		// update user id for all rows in the specified table, e.g. "recurrences.user_id"
		for (const entry of userMap) {
			const newId = entry[1] as string;
			const oldId = entry[0] as string;

			for (const table of constraints) {
				await sql`
               update ${sql(table.table_name)}
               set user_id = ${newId}
               where user_id = ${oldId}
            `;
			}
		}

		// recreate constraint, but with better auth user
		for (const entry of constraints) {
			await sql`
            alter table ${sql(entry.table_name)}
            add constraint ${sql(entry.constraint_name)}
            foreign key (user_id)
            references ${sql(TABLES.BETTER_AUTH.USERS)} (id)
         `;
		}
		console.log("user id migration complete.");
	});
});

try {
	await migrateUserIdConstraints();
} catch (error) {
	console.error(error);
} finally {
	process.exit(1);
}
