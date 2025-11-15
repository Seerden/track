import { resendClient } from "./resend";

export async function listDomains() {
	const domainsResponse = await resendClient.domains.list();

	if (!domainsResponse.data) {
		throw new Error("listDomains: no resend domains found");
	}

	if (domainsResponse.data.has_more) {
		// this shouldn't happen on a free plan 🫠
	}

	const domains = domainsResponse.data.data;
	return domains;
}

try {
	console.log({ resendDomains: await listDomains() });
} catch (error) {
	console.error(error);
}
