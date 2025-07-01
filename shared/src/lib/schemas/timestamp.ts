import day from "@shared/lib/day";
import { type Dayjs } from "dayjs/esm";
import { z } from "zod";

export const timestampSchema = z.union([
	z.string(),
	z.instanceof(Date),
	/** @see https://github.com/colinhacks/zod/discussions/1259#discussioncomment-3954250 */
	z.instanceof(day as unknown as typeof Dayjs),
	z.number(),
]);

/** unix (milli?)seconds? or whatever a postgres Timestamp is, I guess.
 * TODO: figure out What postgres timestamps get parsed to */
export type Timestamp = z.infer<typeof timestampSchema>;
export type Datelike = Timestamp;
