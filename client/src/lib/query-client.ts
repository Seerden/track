import { QueryClient } from "@tanstack/react-query";

export const defaultQueryConfig = {
	queries: {
		staleTime: 1000 * 60 * 5,
		enabled: true,
		gcTime: 1000 * 60 * 5,
		refetchOnMount: true,
		refetchOnWindowFocus: "always",
	},
} as const;

export const _queryClient = new QueryClient({
	defaultOptions: defaultQueryConfig,
});

export function getQueryClient() {
	return new QueryClient({
		defaultOptions: defaultQueryConfig,
	});
}

export const queryClient = getQueryClient();
