import Header from "@/components/layout/Header/Header";
import DetailModals from "@/components/utility/Modal/DetailModals";
import PageWrapper from "@/lib/theme/snippets/page";
import { ErrorBoundary } from "@sentry/react";
import { AnimatePresence } from "framer-motion";
import { Fragment, useState } from "react";
import { useLocation, useOutlet } from "react-router";

/**
 * @see https://stackoverflow.com/questions/74190609/exit-animations-with-animatepresence-framer-motion-and-createbrowserrouter-r
 */
function AnimatedOutlet() {
	const outlet = useOutlet();
	const [outletState] = useState(outlet);

	return (
		<ErrorBoundary fallback={<p>An error occurred.</p>}>
			{outletState}
			<DetailModals />
		</ErrorBoundary>
	);
}

export default function AnimatedRoutes() {
	const location = useLocation();

	return (
		<>
			<Header />
			<PageWrapper>
				<AnimatePresence mode="wait">
					<Fragment key={location.pathname}>
						<AnimatedOutlet />
					</Fragment>
				</AnimatePresence>
			</PageWrapper>
		</>
	);
}
