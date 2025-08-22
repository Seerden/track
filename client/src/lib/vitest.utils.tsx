import { RouterProvider } from "@tanstack/react-router";
import { act, render } from "@testing-library/react";
import { createRouter } from "@/router";

// TODO (TRK-225): tanstack router testing doesn't work right now
export async function renderTanstackRouter() {
	// TODO: create a testing-specific version of createRouter that takes
	// (optionally) a query client (so we can call new QueryClient instead of
	// using the actual one), a memoryHistory, etc
	const router = createRouter();

	const app = render(<RouterProvider router={router} />);

	// Either you can make this part of setup, or call it in each test manually
	await act(() =>
		router.navigate({
			to: "/",
		})
	);

	return {
		app,
		router,
	};
}
