import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { lazy } from "react";
import { Route } from "react-router";
import { HashRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import "./App.scss";
import AnimatedRoutes from "./components/AnimatedRoutes";
import Protected from "./components/Protected";
import Suspended from "./components/Suspended";
import { queryClient } from "./lib/query-client";
import { theme } from "./lib/theme/theme";

const Register = lazy(() => import("./components/Register/Register"));
const Home = lazy(() => import("./components/Home"));
const Header = lazy(() => import("./components/Header/Header"));

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} position="bottom" />
			<RecoilRoot>
				<ThemeProvider theme={theme}>
					<main>
						<Router>
							<Header />
							<AnimatedRoutes>
								<Route
									path="/"
									element={
										<Protected>
											<Home />
										</Protected>
									}
								/>
								<Route
									path="register"
									element={
										<Suspended>
											<Register />
										</Suspended>
									}
								/>
								<Route path="" element={<></>} />
								<Route path="*" element={<div>404</div>} />
							</AnimatedRoutes>
						</Router>
					</main>
				</ThemeProvider>
			</RecoilRoot>
		</QueryClientProvider>
	);
}

export default App;
