import { HeadContent, Scripts } from "@tanstack/react-router";
import { Suspense } from "react";
import { AnimatedRoutes } from "@/components/wrappers/";
import "./App.scss";
import { useCreatePushSubscription } from "@/lib/notifications/useCreatePushSubscription";
import { DefaultSkeleton } from "./components/layout/Skeleton";

function App() {
	useCreatePushSubscription();

	return (
		<>
			<HeadContent />
			<Scripts />
			<Suspense fallback={<DefaultSkeleton />}>
				<main>
					<AnimatedRoutes />
				</main>
			</Suspense>
		</>
	);
}

export default App;
