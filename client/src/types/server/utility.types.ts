import type { Datelike } from "@/types/date.types";

/** unix (milli?)seconds? or whatever a postgres Timestamp is, I guess.
 * TODO: figure out What postgres timestamps get parsed to */
export type Timestamp = Datelike;

/** ids are serial and auto-incrementing */
export type ID = number;

export type Maybe<T> = T | null | undefined;

/** We usually construct these using ids as the key, which aren't really
 * strings, but actually numbers, but they get parsed to strings when they
 * become keys. We define ById as follows because using Record<ID, T> results in
 * arrays being accepted as a valid ById type.
 * @see https://stackoverflow.com/questions/71422178/typescript-record-accepts-array-why
 **/
export type ById<T> = T extends (infer U)[] ? never : Record<ID, T>;

export type NullUnused<TUsed, TUnused> = TUsed & {
	[k in keyof TUnused]: null;
};

/** Type is identical to T except T[K] cannot be optional, if it even was before. */
export type AtLeast<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type HasUserIdField<T> = T & { user_id?: Nullable<ID> };

export type Nullable<T> = T | null;
export type Varchar = string; // TODO: make sure we parse this correctly
