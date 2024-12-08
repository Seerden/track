import userService from "@/lib/fetch/user-service";
import { defaultQueryConfig } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import type { UserData } from "@/types/data.types";
import { useQuery } from "@tanstack/react-query";

export default function useQueryMe() {
	return useQuery<UserData>({
		queryKey: qk.user.me,
		queryFn: userService.getMe,
		...defaultQueryConfig
	});
}
