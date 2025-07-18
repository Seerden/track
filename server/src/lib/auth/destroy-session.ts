import type { Request, Response } from "express";

/** Destroy the active express session, if it exists to begin with. */
export async function destroySession({ req, res }: { req: Request; res: Response }) {}
