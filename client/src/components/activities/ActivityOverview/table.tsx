import type { ActivityWithIds } from "@t/data/activity.types";

type ValueAndElement<T> = { value: T; element: JSX.Element };

export type Table<U extends object, T extends keyof U> = {
	fields: T[];
	rows: Record<T, ValueAndElement<U>>[];
};

/**
   Given an array called `rows` like ```[{
      a: <div>I am "a"</div>,
      b: <div>I am "b"</div>,
      a: <div>I am "c"</div>,
   }]```,
   
   return an object like {
      fields: ["a", "b", "c"],
      rows
   }.

   @example
      const activities: ActivityWithIds[] = [...]
      const activitiesRows = activities.map((activity) => ({
         value: activity,
         element: <div>{activity.name}</div>
      })) as ValueAndElement<ActivityWithIds>[];
      const table = makeTable(activitiesRows);

*/
export function makeTable<U extends object, T extends keyof U>(
	rows: ValueAndElement<U>[]
) {
	// I prefer a flatMap to just mapping over the keys of rows[0]. It allows us
	// to throw an error if the keys are not the same for all rows.
	// TODO: throw an error if the keys are not the same for all rows. 🫠
	const fields = Array.from(new Set(rows.flatMap(Object.keys) as T[]));

	return {
		fields,
		rows
	} as Table<U, T>;
}

// TODO: next step: implement a filter in such a way that it can work on the
// result of makeTable, regardless of the type of the fields.

const activities: ActivityWithIds[] = [
	{
		activity_id: 1,
		created_at: new Date(),
		description: "null",
		end_date: new Date(),
		ended_at: null,
		is_task: true,
		name: "Do the dishes",
		start_date: new Date(),
		started_at: null,
		tag_ids: [],
		user_id: 1,
		completed: false
	}
];

// const c = activities.map((activity) => ({
// 	value: activity,
// 	element: <div>{activity.name}</div>
// })) as ValueAndElement<ActivityWithIds>[];
// const a = makeTable(c);
// const f = a.fields; // typed as keyof NewActivity! :)
