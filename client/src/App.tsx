import { HeadContent, Scripts } from "@tanstack/react-router";
import { Suspense } from "react";
import { AnimatedRoutes } from "@/components/wrappers/";
import "./App.scss";
import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import { useReconcileSettings } from "@/lib/hooks/useReconcileSettings";
import { useCreatePushSubscription } from "@/lib/notifications/useCreatePushSubscription";
import { DefaultSkeleton } from "./components/layout/Skeleton";

function App() {
	useCreatePushSubscription();
	useReconcileSettings();

	return (
		<>
			<HeadContent />
			<Scripts />
			<Suspense fallback={<DefaultSkeleton />}>
				<Header />
				<main>
					<AnimatedRoutes />
				</main>
				<Footer />
			</Suspense>
		</>
	);
}

export default App;
