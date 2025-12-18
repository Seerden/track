import { sendTestNotification } from "@/lib/notifications/test-notification";
import { publicProcedure } from "../../procedures/public.procedure";

export const testNotificationQuery = publicProcedure.query(async () => {
	return await sendTestNotification();
});
