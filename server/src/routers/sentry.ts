import { Router } from "express";

export const sentryRouter = Router({ mergeParams: true });

/**
 * @see https://stackoverflow.com/a/77308117
 */
sentryRouter.post("/", async (req, res) => {
	try {
		const envelope = req.body;
		const pieces = envelope.split("\n");
		const header = JSON.parse(pieces[0]);
		const { host, pathname, username } = new URL(header.dsn);
		const projectId = pathname.slice(1);
		const url = `https://${host}/api/${projectId}/envelope/?sentry_key=${username}`;
		const options = {
			headers: {
				"Content-Type": "application/x-sentry-envelope",
			},
		};

		// Forward the request body and headers to Sentry
		const response = await fetch(url, {
			body: envelope,
			method: "POST",
			...options,
		});

		if (response.ok) {
			const data = await response.json();
			res.status(response.status).json(data);
		} else {
			console.log({ response });
			res.status(response.status).send("Error forwarding to Sentry");
		}
	} catch (error) {
		console.error("Error forwarding to Sentry:", error);
		res.status(500).send("Error forwarding to Sentry");
		return;
	}
});
