import { HeadContent, Scripts } from "@tanstack/react-router";
import { Suspense } from "react";
import { AnimatedRoutes } from "@/components/wrappers/";
import "./App.scss";
import { motion } from "motion/react";
import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import { pageVariants } from "@/lib/framer/variants/page-variants";
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
				<motion.main
					variants={pageVariants}
					initial="hidden"
					animate="appear"
					exit="exit"
					transition={{
						duration: 0.25,
						type: "tween",
						ease: "easeInOut",
					}}
				>
					<main className="[view-transition-name:page]">
						<AnimatedRoutes />
					</main>
				</motion.main>
				<Footer />
			</Suspense>
		</>
	);
}

export default App;
