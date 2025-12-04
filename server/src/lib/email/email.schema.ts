import { timestampSchema } from "@shared/lib/schemas/timestamp";
import { z } from "@shared/lib/zod";

/** Validator for the `emails` table. */
export const emailSchema = z.object({
	object: z.string(),
	id: z.string(),
	to: z.array(z.string()),
	from: z.string(),
	created_at: timestampSchema,
	subject: z.string(),
	bcc: z.array(z.string().nullable()).optional(),
	cc: z.array(z.string().nullable()).optional(),
	reply_to: z.array(z.string().nullable()).optional(),
	last_event: z.string(),
	html: z.string(),
	text: z.nullable(z.string()),
	scheduled_at: z.nullable(z.string()),
});

export type Email = z.infer<typeof emailSchema>;
