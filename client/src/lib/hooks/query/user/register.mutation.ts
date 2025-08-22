import { trpc } from "@/lib/trpc";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export function useRegisterMutation() {
	const navigate = useNavigate();
	return useMutation(
		trpc.auth.register.mutationOptions({
			onSuccess: ({ user }) => {
				// TODO: decide: either redirect here, or call the login mutation.
				// Either way, only do it in one place: here, or in the useRegister hook.
				navigate({ to: "/login" });
			},
		})
	);
}
