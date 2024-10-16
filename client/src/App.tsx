import AnimatedRoutes from "@/components/AnimatedRoutes";
import Suspended from "@components/Suspended";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { lazy } from "react";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import "./App.scss";
import { queryClient } from "./lib/query-client";
import { theme } from "./lib/theme/theme";

const Header = lazy(() => import("@components/Header/Header"));

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} position="bottom" />
			<RecoilRoot>
				<ThemeProvider theme={theme}>
					<Suspended>
						<main>
							<Header />
							<AnimatedRoutes />
							<div id="modal-root" />
						</main>
					</Suspended>
				</ThemeProvider>
			</RecoilRoot>
		</QueryClientProvider>
	);
}

export default App;
