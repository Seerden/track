import { AnimatedRoutes } from "@/components/wrappers/";
import { HeadContent, Scripts } from "@tanstack/react-router";
import { Suspense } from "react";
import "./App.scss";

function App() {
	return (
		<Suspense fallback={<>Loading...</>}>
			<head>
				<HeadContent />
				<Scripts />
			</head>

			<main>
				<AnimatedRoutes />
			</main>
		</Suspense>
	);
}

export default App;
