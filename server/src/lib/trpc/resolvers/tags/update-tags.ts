import { tagUpdateInputSchema } from "@shared/lib/schemas/tag.input";
import { updateTag } from "@/lib/data/models/tags/update-tag";
import { betterAuthProcedure } from "@/lib/trpc/procedures/authenticated.procedure";

export const updateTagMutation = betterAuthProcedure
	.input(tagUpdateInputSchema)
	.mutation(async ({ input, ctx: { user } }) => {
		return await updateTag({ ...input, user_id: user.id });
	});
