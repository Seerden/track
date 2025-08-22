import { theme } from "@/lib/style/theme";
import { trpc } from "@/lib/trpc";
import { Global, ThemeProvider } from "@emotion/react";
import { createTheme, DEFAULT_THEME, MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { DefaultSkeleton } from "./components/layout/Skeleton";
import { queryClient } from "./lib/query-client";
import { routeTree } from "./routeTree.gen";

export function createRouter() {
	const router = createTanStackRouter({
		routeTree,
		defaultPendingMinMs: 0,
		scrollRestoration: true,
		defaultPreload: "intent",
		// TODO (from TRK-254): this is temporary, but I do want to use some kind
		// of skeleton here. Maybe include a skeleton for the header, too.
		defaultPendingComponent: () => {
			return (
				<>
					<div
						style={{
							padding: "3rem",
							width: "100%"
						}}
					>
						<DefaultSkeleton />
					</div>
				</>
			);
		},
		Wrap: function WrapComponent({ children }) {
			return (
				<QueryClientProvider client={queryClient}>
					<ReactQueryDevtools initialIsOpen={false} position="bottom" />
					<MantineProvider theme={createTheme(DEFAULT_THEME)}>
						<Global styles={theme.global} />
						<ThemeProvider theme={theme}>{children}</ThemeProvider>
					</MantineProvider>
				</QueryClientProvider>
			);
		},
		context: {
			queryClient,
			trpc
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
