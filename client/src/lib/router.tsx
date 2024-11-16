import App from "@/App";
import NewHabit from "@/components/habits/NewHabit/NewHabit";
import Protected from "@/components/Protected";
import Suspended from "@/components/Suspended";
import Page from "@/lib/framer/components/Page";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

const Home = lazy(() => import("@components/Home"));
const NewNote = lazy(() => import("@components/NewNote/NewNote"));
const Register = lazy(() => import("@/components/auth/Register/Register"));
const NewActivity = lazy(() => import("@components/activities/NewActivity/NewActivity"));
const ActivityList = lazy(
	() => import("@/components/activities/ActivityList/ActivityList")
);
const Today = lazy(() => import("@components/Today/Today"));
const Notes = lazy(() => import("@components/Notes/Notes"));

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
							<NewActivity />
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
