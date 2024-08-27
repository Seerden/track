/** unix (milli?)seconds? or whatever a postgres Timestamp is, I guess.
 * TODO: figure out What postgres timestamps get parsed to */
export type Timestamp = number;

/** ids are serial and auto-incrementing */
export type ID = number;

export type Maybe<T> = T | null | undefined;
