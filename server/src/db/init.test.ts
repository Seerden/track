import { pingDatabase } from "./init";

describe("test-database connection", () => {
	it("initializes", async () => {
		expect(async () => await pingDatabase()).not.toThrow();
	});
});
