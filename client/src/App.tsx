import { AnimatedRoutes } from "@/components/wrappers/";
import { HeadContent, Scripts } from "@tanstack/react-router";
import { Suspense } from "react";
import "./App.scss";
import { DefaultSkeleton } from "./components/layout/Skeleton";

function App() {
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
