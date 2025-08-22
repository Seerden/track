import { isNullish } from "@shared/lib/is-nullish";
import type { Timestamp } from "@shared/lib/schemas/timestamp";
import type { WithSQL } from "types/sql.types";
import { sqlConnection } from "@/db/init";

/** Builder for a time-window-restricted activities filter.
   - if `from` and `to` are both given, we include activities that occur at
      least partially in the window.
   - if only either `from` or `to` is given, only include activities that
      actually start/end before/after the given timestamp.      
   @todo TRK-254: expand this logic to optionally be strict (only include
   activities that fall fully within the time window), instead of including
   activities that fall partially within the window. */
export function timeWindowFilter({
	from,
	to,
	sql = sqlConnection,
}: WithSQL<{ from?: Timestamp; to?: Timestamp }>) {
	let filter = sql``;

	if (!isNullish(from) && !isNullish(to)) {
		filter = sql`
         and (
            (
            -- time window is entirely within activity
               started_at <= ${from.valueOf()} and
               ended_at >= ${to.valueOf()}
            ) or (
            -- activity starts within time window
               started_at >= ${from.valueOf()} and
               started_at <= ${to.valueOf()}
            ) or (
            -- activity ends within time window
               ended_at >= ${from.valueOf()} and
               ended_at <= ${to.valueOf()}
            ) or (
            -- same conditions as above, but using start_date/end_date 
            -- instead of started_at/ended_at
               start_date <= ${to.valueOf()} and
               end_date >= ${from.valueOf()}
            ) or (
               start_date >= ${from.valueOf()} and
               start_date <= ${to.valueOf()}
            ) or (
               end_date >= ${from.valueOf()} and
               end_date <= ${to.valueOf()}
            )
         )
      `;
	} else if (!isNullish(from)) {
		filter = sql`
         and (
            started_at >= ${from.valueOf()} or
            start_date >= ${from.valueOf()}
         )
      `;
	} else if (!isNullish(to)) {
		filter = sql`
         and (
            ended_at <= ${to.valueOf()} or
            end_date <= ${to.valueOf()}
         )
      `;
	}

	return filter;
}
