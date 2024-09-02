export const baseUrl = "http://localhost:5000"; // TODO: generalize this in an .env variable

export const postConfig: RequestInit = {
	method: "POST",
	credentials: "include",
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
};
