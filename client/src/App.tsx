import AnimatedRoutes from "@/components/AnimatedRoutes";
import { spacing } from "@/lib/theme/snippets/spacing";
import { createTheme, DEFAULT_THEME, MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { lazy, Suspense } from "react";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import "./App.scss";
import { queryClient } from "./lib/query-client";
import { theme } from "./lib/theme/theme";

const Header = lazy(() => import("@components/Header/Header"));

console.log({ t: `${spacing.margin.tall({ size: 0.4, ratio: 3 })}` });

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} position="bottom" />
			<MantineProvider theme={createTheme(DEFAULT_THEME)}>
				<RecoilRoot>
					<ThemeProvider theme={theme}>
						<Suspense fallback={<>Loading...</>}>
							<main>
								<Header />
								<AnimatedRoutes />
								<div id="modal-root" />
							</main>
						</Suspense>
					</ThemeProvider>
				</RecoilRoot>
			</MantineProvider>
		</QueryClientProvider>
	);
}

export default App;
