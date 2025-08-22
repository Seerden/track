import { HttpResponse, http } from "msw";

export const handlers = [
	http.get("/test", () => {
		return new HttpResponse(null, { status: 201 });
	})
];
