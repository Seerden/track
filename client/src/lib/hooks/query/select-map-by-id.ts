import type { DataById, DataByIdMap } from "@/types/query.types";

export default function transformByIdToMap<T extends DataById<object>>(
	data: T
): DataByIdMap<T> {
	const byId = new Map(Object.entries(data.byId));
	return Object.assign({}, data, { byId }) as DataByIdMap<T>;
}
