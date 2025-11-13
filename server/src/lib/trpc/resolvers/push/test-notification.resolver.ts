import { sendTestNotification } from "@/lib/notifications/test-notification";
import { publicProcedure } from "../../procedures/public.procedure";

export const testNotification = publicProcedure.query(async () => {
	return await sendTestNotification();
});
