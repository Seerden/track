import { arrayMapById } from "./map";

describe("map", () => {
	describe("arrayMapById", () => {
		it("groups a valid array with target and id field properly", () => {
			const array: Array<{ test_id: string; target: number }> = [
				{ test_id: "1", target: 1 },
				{ test_id: "2", target: 2 },
				{ test_id: "1", target: 3 },
				{ test_id: "3", target: 4 },
				{ test_id: "3", target: 5 },
			];

			expect(arrayMapById(array, "test_id", "target")).toEqual(
				new Map([
					["1", [1, 3]],
					["2", [2]],
					["3", [4, 5]],
				])
			);
		});

		it("returns an empty map when an empty array is passed", () => {
			expect(
				arrayMapById(
					[] as Array<{ test_id: string; target: string }>,
					"test_id",
					"target"
				)
			).toEqual(new Map());
		});

		it("throws when there is no id field", () => {
			expect(() => {
				return arrayMapById(
					[] as Array<{ target: string }>,
					// @ts-expect-error
					"test",
					"target"
				);
			}).toThrowError(/idField/);
		});
	});
});
