import router from "@/lib/router.tsx";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import duration from "dayjs/plugin/duration";
import localeData from "dayjs/plugin/localeData";
import relativeTime from "dayjs/plugin/relativeTime";
import tz from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.scss";
import { worker } from "./mocks/browser.ts";
import "./normalize.css";
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(tz);
dayjs.extend(utc);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);

if (process.env.NODE_ENV === "development") {
	await worker.start();
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
