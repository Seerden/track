import type { Request, Response } from "express";

/** Destroy the active express session, if it exists to begin with. */
export async function destroySession({
	req,
	res,
}: {
	req: Request;
	res: Response;
}) {
	// TODO: this does nothing right now, I guess I never implemented the new
	// implementation when I switched to trpc. This should call the code from the
	// logout resolver, or maybe just call the resolver directly?
}
