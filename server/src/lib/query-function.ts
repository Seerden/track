import { AsyncLocalStorage } from "node:async_hooks";
import type { TransactionSql } from "postgres";
import type { SQL } from "types/sql.types";
import { sqlConnection } from "@/db/init";

const sqlStore = new AsyncLocalStorage<SQL | TransactionSql>();

/** Gets the current SQL connection (transaction or default). */
export const getConnectionFromAsyncStore = () =>
	sqlStore.getStore() ?? sqlConnection;

/** Runs a function within a transaction context.
 * @todo (TRK-290) this is the new way to run transactions, instead of passing
 * sql as an argument to every single query function, which I thought was too
 * much boilerplate.
 * @usage
 * ```
 *    await sql.begin(async (q) => {
 *       await transaction(q, async () => {
 *          <inner logic here>
 *       })
 *    })
 * ```
 * @note for transactions, the sql connection's type becomes TransactionSql,
 * which has a .savepoint, but the query function might not be aware it's in a
 * transaction, so we need to either expand the store with this information, or
 * type-alias the connection manually in query functions when in a transaction.
 */
export const transaction = (tx: SQL, fn: () => Promise<unknown>) =>
	sqlStore.run(tx, fn);

/** Query function constructor.
 * This exists for the following purpose: If the inner function (e.g.
 * queryUsersById) doesn't need to use a non-standard sql connection (e.g. we're not in a
 * transaction), then we don't have to pass a sql connection manually.
 */
export const query = <TInput, TOutput>(
	queryFunction: (sql: SQL, input: TInput) => Promise<TOutput>
) => {
	return (input: TInput): Promise<TOutput> => {
		const sql = getConnectionFromAsyncStore();
		return queryFunction(sql, input);
	};
};
