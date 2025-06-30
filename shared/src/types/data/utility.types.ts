import { timestampSchema } from "@shared/lib/schemas/timestamp";
import type { Dayjs } from "dayjs";
import { z } from "zod";

/** unix (milli?)seconds? or whatever a postgres Timestamp is, I guess.
 * TODO: figure out What postgres timestamps get parsed to */
export type Timestamp = Datelike;

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

export type NullUnused<TUsed, TUnused> = TUsed & {
	[k in keyof TUnused]: null;
};

/** Type is identical to T except T[K] cannot be optional, if it even was before. */
export type AtLeast<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type HasUserIdField<T> = T & { user_id?: Nullable<ID> };

export type Nullable<T> = T | null;
export type Varchar = string; // TODO: make sure we parse this correctly

export type Datelike = z.infer<typeof timestampSchema>;

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
export type OmitStrict<T, K extends keyof T> = T extends any
	? Pick<T, Exclude<keyof T, K>>
	: never;

export type IntervalUnit = "day" | "week" | "month" | "year";
