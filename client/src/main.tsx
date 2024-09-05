import dayjs from "dayjs";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { worker } from "./mocks/browser.ts";
import "./normalize.css";

import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(duration);
dayjs.extend(relativeTime);

if (process.env.NODE_ENV === "development") {
	await worker.start();
}

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
