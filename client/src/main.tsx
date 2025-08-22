import { baseUrl } from "@/lib/fetch/fetch-constants";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import * as Sentry from "@sentry/react";
import { RouterProvider } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import "./normalize.css";

import { enableMapSet } from "immer";
import { createRouter } from "@/router";

export const router = createRouter();

Sentry.init({
	// Note: we could also use an environment variable, but the DSN is public
	// anyway and we're probably not going to use different DSNs for different
	// environments anyway.
	dsn: "https://b0e7e65134d60f61d0dda728b3c918be@o4508463516680192.ingest.de.sentry.io/4508463529984080",
	integrations: [
		// See docs for support of different versions of variation of react router
		// https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/
		Sentry.tanstackRouterBrowserTracingIntegration(router),
	],
	// Tracing
	tracesSampleRate: 1.0, //  Capture 100% of the transactions
	// Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
	tracePropagationTargets: ["localhost"], // /^https:\/\/yourserver\.io\/api/],
	// Session Replay
	replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
	replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
	tunnel: `${baseUrl}/sentry`,
});

if (process.env.NODE_ENV === "development") {
	// await worker.start({
	// 	onUnhandledRequest: "bypass"
	// });
}

enableMapSet();

// biome-ignore lint/style/noNonNullAssertion: root will exist
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
