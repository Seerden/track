import type { ById, ID } from "types/data/utility.types";

/** Why do I use this in other projects? This is just an object. */
export type Data<K extends string, T> = Record<K, T>;

export type DataById<T> = Data<"byId", ById<T>>;

/** This type represents DataById<T> with the byId object transformed to a Map. */
export type MappedData<T extends DataById<unknown>> = {
	byId: Map<ID, T extends DataById<infer U> ? U : never>;
};
