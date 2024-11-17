import { render, screen } from "@lib/test/render-utils";

describe("empty component", () => {
	it("should pass", () => {
		render(<div>hello</div>);
		expect(screen.getByText("hello")).toBeInTheDocument();
	});
});
