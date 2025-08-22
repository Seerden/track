import { z } from "@shared/lib/zod";
import type { Dayjs } from "dayjs";
/** ids are serial and auto-incrementing */
export type ID = string;

export type Maybe<T> = T | null | undefined;

/** We usually construct these using ids as the key, which aren't really
 * strings, but actually numbers, but they get parsed to strings when they
 * become keys. We define ById as follows because using Record<ID, T> results in
 * arrays being accepted as a valid ById type.
 * @see https://stackoverflow.com/questions/71422178/typescript-record-accepts-array-why
 **/
export type ById<T> = T extends unknown[] ? never : Record<ID, T>;
export type ByIdMap<T> = T extends unknown[] ? never : Map<ID, T>;

/** `ByIdMap<T> !== Map<ID, T>` for some cases I've encountered, and I genuinely
 * don't understand why (I think maybe it's inferring nested fields as arrays?);
 * @example: `ByIdMap<ActivityWithIds>` in `mergeActivitiesAndRelations`.
 * Because of that issue, use this type instead, for these types of Maps. */
export type MapById<T> = Map<ID, T>;

/** Type helper for discriminated unions
 * @usage mostly obsolete now that I have trpc schemas for validation. */
export type NullUnused<TUsed, TUnused> = TUsed & {
	[k in keyof TUnused]: null;
};

/** Type is identical to T except T[K] cannot be optional, if it even was before. */
export type AtLeast<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type HasUserIdField<T> = T & { user_id?: Nullable<ID> };

export type Nullable<T> = T | null;
export type Varchar = string; // TODO: make sure we parse this correctly

export type DeepValue<T> = T extends unknown[]
	? never
	: T extends object
		? DeepValue<T[keyof T]>
		: T;

export type StartAndEnd = {
	start: Dayjs;
	end: Dayjs;
};

/**
 * Omit that only works with keys actually present in the object.
 * @see https://github.com/microsoft/TypeScript/issues/30825#issuecomment-673002409 */

// biome-ignore lint/suspicious/noExplicitAny: ^
export type OmitStrict<T, K extends keyof T> = T extends any
	? Pick<T, Exclude<keyof T, K>>
	: never;

export type IntervalUnit = "day" | "week" | "month" | "year";

export const dayOfWeekSchema = z.enum([
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
]);

export type DayOfWeek = z.infer<typeof dayOfWeekSchema>;

export type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};
