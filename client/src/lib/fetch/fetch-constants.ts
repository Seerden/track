export const baseUrl = "http://localhost:5000"; // TODO: use something else in production

export const postConfig: RequestInit = {
	method: "POST",
	credentials: "include",
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json"
	}
};

export const putConfig: RequestInit = {
	method: "PUT",
	credentials: "include",
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json"
	}
};
