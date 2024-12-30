import type { ById, ID } from "@t/data/utility.types";

/** Why do I use this in other projects? This is just an object. */
export type Data<K extends string, T> = Record<K, T>;

export type DataById<T> = Data<"byId", ById<T>>;

export type DataByIdMap<T> = DataById<T> & { byId: Map<ID | string, T> };
