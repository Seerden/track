import type { MutationFunction } from "@tanstack/react-query";
import { useMutation as _useMutation } from "@tanstack/react-query";

/** Use this along with typing to create mutation hooks with proper typing.
 * @see useMutateRecurrence.ts
 */
export default function useMutation<TData, TVariables>(
	mutationFn: MutationFunction<TData, TVariables>,
	onSuccess?: () => void
) {
	return _useMutation({
		mutationFn,
		onSuccess
	});
}
