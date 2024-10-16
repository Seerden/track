import dayjs from "dayjs";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { worker } from "./mocks/browser.ts";
import "./normalize.css";

import router from "@/lib/router.tsx";
import customParseFormat from "dayjs/plugin/customParseFormat";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import tz from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { RouterProvider } from "react-router-dom";
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(tz);
dayjs.extend(utc);
dayjs.extend(customParseFormat);

if (process.env.NODE_ENV === "development") {
	await worker.start();
}

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
