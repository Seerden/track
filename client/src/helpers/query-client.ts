import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 0,
			enabled: true,
			gcTime: 1000 * 60 * 5,
			refetchOnMount: true,
			refetchOnWindowFocus: true,
		},
	},
});
