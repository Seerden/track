type ValueAndElement<T> = { value: T; element: JSX.Element };

export type Table<TData extends object, TDataKey extends keyof TData> = {
	fields: TDataKey[];
	rows: Record<TDataKey, ValueAndElement<TData>>[];
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

   @todo next step: implement a filter in such a way that it can work on the
   result of makeTable, regardless of the type of the fields. 
*/
export function makeTable<TData extends object, TDataKey extends keyof TData>(
	rows: ValueAndElement<TData>[]
) {
	// I prefer a flatMap to just mapping over the keys of rows[0]. It allows us
	// to throw an error if the keys are not the same for all rows.
	// TODO: throw an error if the keys are not the same for all rows. 🫠
	const fields = Array.from(new Set(rows.flatMap(Object.keys) as TDataKey[]));

	return {
		fields,
		rows
	} as Table<TData, TDataKey>;
}
