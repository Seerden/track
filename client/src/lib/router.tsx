import App from "@/App";
import { Protected, Suspended } from "@/components/wrappers";
import Page from "@/lib/framer/components/Page";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

const Home = lazy(() => import("@/components/Home/Home"));
const NewNote = lazy(() => import("@/components/notes/NewNote/NewNote"));
const Register = lazy(() => import("@/components/auth/Register/Register"));
const ActivityForm = lazy(
	() => import("@/components/activities/ActivityForm/ActivityForm")
);
const NewHabit = lazy(() => import("@components/habits/NewHabit/NewHabit"));
const Today = lazy(() => import("@components/Today/Today"));
const Login = lazy(() => import("@/components/auth/Login/Login"));
const ActivityOverview = lazy(
	() => import("@/components/activities/ActivityOverview/ActivityOverview")
);
const LogDetail = lazy(() => import("@/components/logbooks/LogDetail/LogDetail"));
const LogbookForm = lazy(() => import("@/components/logbooks/LogbookForm/LogbookForm"));
const LogbookCard = lazy(() => import("@/components/logbooks/Logbooks/LogbookCard"));
const Logbooks = lazy(() => import("@/components/logbooks/Logbooks/Logbooks"));
const LogForm = lazy(() => import("@/components/logbooks/LogForm/LogForm"));

const topLevelRoutes: RouteObject[] = [
	{
		path: "",
		index: true,
		element: (
			<Suspended>
				<Protected>
					<Home />
				</Protected>
			</Suspended>
		)
	},
	{
		path: "/register",
		element: (
			<Suspended>
				<Register />
			</Suspended>
		)
	},
	{
		path: "/login",
		element: (
			<Suspended>
				<Login />
			</Suspended>
		)
	},
	{
		path: "/today",
		element: (
			<Protected>
				<Today />
			</Protected>
		)
	},
	{
		path: "/activities",
		children: [
			{
				index: true,
				element: (
					<Protected>
						<Page>
							<ActivityOverview />
						</Page>
					</Protected>
				)
			},
			{
				path: "new",
				element: (
					<Protected>
						<Page>
							<ActivityForm />
						</Page>
					</Protected>
				)
			}
		]
	},
	{
		path: "/notes",
		children: [
			{
				path: "new",
				element: (
					<Protected>
						<NewNote />
					</Protected>
				)
			}
		]
	},
	{
		path: "/habits",
		children: [
			{
				path: "new",
				element: (
					<Protected>
						<Page>
							<NewHabit />
						</Page>
					</Protected>
				)
			}
		]
	},
	{
		path: "logbooks",
		children: [
			{
				path: "",
				index: true,
				element: (
					<Protected>
						<Page>
							<Logbooks />
						</Page>
					</Protected>
				)
			},
			{
				path: "new",
				element: (
					<>
						<Page>
							<LogbookForm />
						</Page>
					</>
				)
			},
			{
				path: ":logbookId",
				children: [
					{
						index: true,
						element: (
							<Protected>
								<Page>
									{/* TODO: this should not be logbookcard, but detailedlogbook, which doesn't exist yet */}
									<LogbookCard />
								</Page>
							</Protected>
						)
					},
					{
						path: "log",
						element: (
							<Protected>
								<Page>
									<LogForm />
								</Page>
							</Protected>
						)
					},
					{
						path: "log/:logId",
						element: (
							<Protected>
								<Page>
									<LogDetail />
								</Page>
							</Protected>
						)
					}
				]
			}
		]
	}
];

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: topLevelRoutes
	},
	{
		path: "*",
		element: <div>404</div>
	}
]);

export default router;
