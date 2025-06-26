import { theme } from "@/lib/theme/theme";
import { createTheme, DEFAULT_THEME, MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { ThemeProvider } from "styled-components";
import { queryClient } from "./lib/query-client";
import { routeTree } from "./routeTree.gen";

export function createRouter() {
	const router = createTanStackRouter({
		routeTree,
		defaultPendingMinMs: 0,
		scrollRestoration: true,
		defaultPreload: "intent",
		// TODO: defaultPendingComponent?
		Wrap: function WrapComponent({ children }) {
			return (
				<QueryClientProvider client={queryClient}>
					<ReactQueryDevtools initialIsOpen={false} position="bottom" />
					<MantineProvider theme={createTheme(DEFAULT_THEME)}>
						<ThemeProvider theme={theme}>{children}</ThemeProvider>
					</MantineProvider>
				</QueryClientProvider>
			);
		},
		context: {
			queryClient
		}
	});

	return router;
}

// register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof createRouter>;
	}
}
