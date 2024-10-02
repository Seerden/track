import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { lazy } from "react";
import { Route } from "react-router";
import { HashRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import "./App.scss";
import AnimatedRoutes from "./components/AnimatedRoutes";
import Notes from "./components/Notes/Notes";
import Protected from "./components/Protected";
import Suspended from "./components/Suspended";
import Today from "./components/Today/Today";
import { queryClient } from "./lib/query-client";
import { theme } from "./lib/theme/theme";

const NewNote = lazy(() => import("./components/NewNote/NewNote"));
const Register = lazy(() => import("./components/Register/Register"));
const Home = lazy(() => import("./components/Home"));
const Header = lazy(() => import("./components/Header/Header"));
const NewActivity = lazy(() => import("./components/NewActivity/NewActivity"));
const ActivityList = lazy(() => import("./components/ActivityList/ActivityList"));

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} position="bottom" />
			<RecoilRoot>
				<ThemeProvider theme={theme}>
					<Suspended>
						<main>
							<Router>
								<Header />
								<AnimatedRoutes>
									<Route
										path="/today"
										element={
											<Protected>
												<Today />
											</Protected>
										}
									/>
									<Route
										path="/activities"
										element={
											<Protected>
												<ActivityList />
											</Protected>
										}
									/>
									<Route
										path="/notes"
										element={
											<Protected>
												<Notes />
											</Protected>
										}
									/>
									<Route
										path="/note/new"
										element={
											<Protected>
												<NewNote />
											</Protected>
										}
									/>

									<Route
										path="/activity/new"
										element={
											<Protected>
												<NewActivity />
											</Protected>
										}
									/>

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
								<div id="modal-root" />
							</Router>
						</main>
					</Suspended>
				</ThemeProvider>
			</RecoilRoot>
		</QueryClientProvider>
	);
}

export default App;
