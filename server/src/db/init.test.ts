import { config } from "dotenv";
import { sqlConnection as sql } from "./init";
config();

describe("test-database connection", () => {
	it("initializes", async () => {
		const [result] = await sql`select array[1]`;
		expect(result.array).toEqual([1]);
	});
});
