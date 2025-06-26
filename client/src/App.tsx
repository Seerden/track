import { AnimatedRoutes } from "@/components/wrappers/";
import { Suspense } from "react";
import "./App.scss";

function App() {
	return (
		<Suspense fallback={<>Loading...</>}>
			<main>
				<AnimatedRoutes />
			</main>
		</Suspense>
	);
}

export default App;
