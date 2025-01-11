import type { MutationFunction } from "@tanstack/react-query";
import { useMutation as _useMutation } from "@tanstack/react-query";

export default function useMutation<TData, TVariables>(
	mutationFn: MutationFunction<TData, TVariables>,
	onSuccess?: () => void
) {
	return _useMutation({
		mutationFn,
		onSuccess
	});
}
