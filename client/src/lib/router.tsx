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
const ActivityList = lazy(
	() => import("@/components/activities/ActivityList/ActivityList")
);
const Today = lazy(() => import("@components/Today/Today"));
const Notes = lazy(() => import("@/components/notes/Notes/Notes"));
const Login = lazy(() => import("@/components/auth/Login/Login"));

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
				element: (
					<Protected>
						<ActivityList />
					</Protected>
				),
				index: true
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
				index: true,
				element: (
					<Protected>
						<Notes />
					</Protected>
				)
			},
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
