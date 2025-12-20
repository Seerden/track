import { newHabitSchema } from "@shared/lib/schemas/habit";
import { z } from "@shared/lib/zod";

export const habitInputSchema = z.object({
	habit: newHabitSchema,
	tagIds: z.array(z.string()).optional(),
});
export type HabitInput = z.infer<typeof habitInputSchema>;
