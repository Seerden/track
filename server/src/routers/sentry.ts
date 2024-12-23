import { Router } from "express";

export const sentryRouter = Router({ mergeParams: true });

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
			return res.status(response.status).json(data);
		} else {
			console.log({ response });
			return res.status(response.status).send("Error forwarding to Sentry");
		}
	} catch (error) {
		console.error("Error forwarding to Sentry:", error);
		return res.status(500).send("Error forwarding to Sentry");
	}
});
