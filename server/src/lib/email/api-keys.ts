import { resendClient } from "./resend";

export async function listApiKeys() {
	return await resendClient.apiKeys.list();
}

try {
	console.log({ resendDomains: await listApiKeys() });
} catch (error) {
	console.error(error);
}
